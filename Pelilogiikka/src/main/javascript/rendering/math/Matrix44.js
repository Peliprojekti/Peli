

    function Matrix44( array )
    {
                
      this.data = [ 1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1 ];
        
        if( VALID( array ) )
        {
            ASSERT_LENGTH( array, 16 );
            for( var i = 0; i < 16; i++ )  this.data[ i ] = array[i];
            return;
        }

        if( TYPE( Matrix33, array ) ) return this.embed( array );
               
        if( TYPE( Matrix44, array ) ) 
            for( var i = 0; i < 16; i++ ) 
            {
                this.data[ i ] = array.data[i];
            }

    }
    
    
    Matrix44.prototype.Identity = function ()
    {
        for( var i = 0; i < 4; i++ )
            for( var j = 0; j < 4; j++ )
                 this.data[i*4 + j] = ( i == j ) ? 1.0 : 0.0;
    }



    Matrix44.prototype.multiply = function( mat )
    {
        ASSERT_TYPE( Matrix44, mat, "Expected Matrix44 for valid 4x4 Matrix multiplication");
        
        var ret    = new Matrix44();

        for( var i = 0; i < 4; i++ )
            for( var j = 0; j < 4; j++ )
            {
                ret.data[(4*i)+j] = mat.data[ 4*i   ] * this.data[0+j] + 
                                    mat.data[(4*i)+1] * this.data[4+j] + 
                                    mat.data[(4*i)+2] * this.data[8+j] +
                                    mat.data[(4*i)+3] * this.data[12+j];
            }
        
    return ret;
    }
    
    
    
    Matrix44.prototype.transform = function( vec3 )
    {
        ASSERT_TYPE( Vector3, vec3, "Expected Vector3 for the HAX44 transformation");
        
        var x   = vec3.x;
        var y   = vec3.y;
        var z   = vec3.z;
        var ret = new Vector3( x * this.data[0] + x * this.data[1] + x * this.data[2] ,
                               y * this.data[4] + y * this.data[5] + y * this.data[6] , 
                               z * this.data[9] + z * this.data[9] + z * this.data[10] );
         
    return ret.add( this.get_Translation() );
    }




    Matrix44.prototype.embed = function( matrix )
    {
        ASSERT_TYPE( Matrix33, matrix, "Expected Matrix33 for embed to Matrix44" );
        
        for( var i = 0; i < 3; i++ )
            for( var j = 0; j < 3; j++)
                this.data[i*4 + j] = matrix.data[i*3 + j];
    }
    

    Matrix44.prototype.embed_Translation = function( vector )
    {
        ASSERT_TYPE( Vector3, vector, "Expected Vector3 to for embed to Matrix44 as translation");
        
        this.data[12] = vector.x;
        this.data[13] = vector.y;
        this.data[14] = vector.z;
    }
    
    
    Matrix44.prototype.extract_Orientation = function()
    {
        return new Matrix33( [ this.data[ 0 ],this.data[ 1 ],this.data[ 2 ],
                               this.data[ 4 ],this.data[ 5 ],this.data[ 6 ],
                               this.data[ 8 ],this.data[ 9 ],this.data[ 10] ] );
    }
    
    


    Matrix44.prototype.get_Translation = function()
    {
        return new Vector3( this.data[12] ,
                            this.data[13] ,
                            this.data[14] );
    }



    
    Matrix44.prototype.alert = function() 
    {
        var msg = "";
        
        for( var r = 0; r < 4; r++ )
        {
            msg += "[ ";
            for( var c = 0; c < 4; c++ )
            { 
                var val  = this.data[ 4*r + c ];
                    val  = ( Math.abs(val) < EPSILON ) ? 0 : val;
                    msg += val;
                    msg +=" "; 
            }
            msg += "] \n";
        }
        
    alert( msg );
    }
    
    
    
    Matrix44.prototype.build_Transformation = function( position, rotation, scale )
    {
        var rotX   = new Matrix33();
        var rotY   = new Matrix33();
        var rotZ   = new Matrix33();
        
        rotX.RotationX( rotation.x );
        rotY.RotationX( rotation.y );
        rotZ.RotationX( rotation.z );
        
        var orient = new Matrix33();
            orient = orient.multiply( rotX );
            orient = orient.multiply( rotY );
            orient = orient.multiply( rotZ );
           
        var     m1 = new Matrix44();
                m1.embed( orient );
            
        var     m2 = new Matrix44( [       1.0,          0,          0,     0,
                                             0,        1.0,          0,     0,
                                             0,          0,        1.0,     0,
                                    position.x, position.y, position.z,   1.0  ]);
   
        var     m3 = new Matrix44( [ scale.x,       0,       0,     0,
                                           0, scale.y,       0,     0,
                                           0,       0, scale.z,     0,
                                           0,       0,       0,   1.0  ]);
        var ret =  m3.multiply( m2 );
            ret = ret.multiply( m1 );
    return  ret; 
    }