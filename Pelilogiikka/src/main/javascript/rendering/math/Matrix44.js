

    function Matrix44( array )
    {
                
      this.data = [ 1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1 ];
        
        if( VALID( array ) )
        {
            ASSERT_LENGTH( array, 16 );
         
            for( var i = 0; i < 16; i++ )
            {
                this.data[ i ] = array[i];
            }
                  
        return;
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