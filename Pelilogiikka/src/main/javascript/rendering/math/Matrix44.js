

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
    
    
    
    
        
    Matrix44.prototype.transform = function( vec3 )
    {
        ASSERT_TYPE( Vector3, vec3, "Expected Vector3 for the HAX44 transformation");
        
        var x = vec3.x;
        var y = vec3.y;
        var z = vec3.z;
        
        var x1 = x * this.data[0] + y * this.data[4] + z * this.data[8]  + 1.0* this.data[12];
        var y1 = x * this.data[1] + y * this.data[5] + z * this.data[9]  + 1.0* this.data[13];
        var z1 = x * this.data[2] + y * this.data[6] + z * this.data[10] + 1.0* this.data[14];
        
        
    return new Vector3(x1,y1,z1); //vec3;
    }

    
    
    Matrix44.prototype.build_Transformation = function( pos, rot, sca )
    {
        console.info( pos.x + " " + pos.y + " " + pos.z );
        
        var rotation_X = new Matrix33();
            rotation_X.RotationX( DegToRad( rot.x ) );
        
        var rotation_Y = new Matrix33();
            rotation_Y.RotationY( DegToRad( rot.y ) );
          
        var rotation_Z = new Matrix33();
            rotation_Z.RotationZ( DegToRad( rot.z ) );
        
        var rotation   = rotation_X.multiply( rotation_Y );
            rotation   = rotation.multiply( rotation_Z );
             
        var scale      = new Matrix33();
            scale.Scale( sca );
            
            rotation   = rotation.multiply( scale );
        var rot44      = new Matrix44();
            rot44.embed( rotation );
  
    
            rot44.data[12] = pos.x;
            rot44.data[13] = pos.y;
            rot44.data[14] = pos.z;
    
    return rot44;
    }