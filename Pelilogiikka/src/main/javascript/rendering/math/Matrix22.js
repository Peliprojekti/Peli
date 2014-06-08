

    function Matrix22( array )
    { 
      this.data = [ 1, 0,
                    0, 1 ]; // HURR DURR. WE NO USE LEFT HANDED CONVENTION
                
        if( VALID( array ) )
        {
            ASSERT_LENGTH( array, 4 );
    
            for( var i = 0; i < 4; i++ )
                this.data[ i ] = array[ i ];
        }
    }
    
    
    Matrix22.prototype.Identity = function ()
    {
          for( var i = 0; i < 2; i++ )
            for( var j = 0; j < 2; j++ )
                 this.data[i*2+j] = ( i == j) ? 1.0 : 0.0; 
    }
    

    Matrix22.prototype.Rotation = function( rads )
    {
        this.data[0] = Math.cos(rads); this.data[1] = -Math.sin(rads);
        this.data[2] = Math.sin(rads); this.data[3] =  Math.cos(rads);
    }
    
    
    Matrix22.prototype.Scale = function( scales ) 
    {
        ASSERT_TYPE( Vector2, scales );
        
        this.data[0] = scales.x; this.data[1] =         0;
        this.data[2] =        0; this.data[3] =  scales.y;
    }
    

    Matrix22.prototype.multiply = function( mat )
    {
        ASSERT_TYPE( Matrix22, mat, "Expected Matrix22 for valid 2x2 Matrix multiplication");
        
        var ret = new Matrix22();

        for( var i = 0; i < 2; i++ )
            for( var j = 0; j < 2; j++ )
            {
                ret.data[(2*i)+j] = mat.data[ 2*i   ] * this.data[0+j] + 
                                    mat.data[(2*i)+1] * this.data[2+j];
            }
       
    return ret;
    }
    
    Matrix22.prototype.transform = function( vec2 ) 
    {
        ASSERT_TYPE( Vector2, vec2, "Expected Vector2 for valid transformation by 2x2 Matrix ");

        return new Vector2( vec2.x * this.data[0] + vec2.y * this.data[1] , 
                            vec2.x * this.data[2] + vec2.y * this.data[3]  );
    }
    
    


    Matrix22.prototype.alert = function() 
    {       
        var msg = "";
        
        for( var r = 0; r < 2; r++ )
        {
            msg += "[ ";
            for( var c = 0; c < 2; c++ )
            {
                var val  = this.data[ 2*r + c ];
                    val  = ( Math.abs(val) < EPSILON ) ? 0 : val;
                    msg += val;
                    msg += " "; 
            }
            msg += "] \n";
        }
        
    alert( msg );
    }
    
    

    Matrix22.prototype.extract_I = function()
    {
        return new Vector2( this.data[0], this.data[1] );
    }
    
    Matrix22.prototype.extract_J = function()
    {
        return new Vector2( this.data[2], this.data[3] );
    }    
    
