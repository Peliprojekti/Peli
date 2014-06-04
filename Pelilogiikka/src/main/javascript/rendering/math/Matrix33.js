

    function Matrix33( array )
    { 
      this.data = [ 1, 0, 0,
                    0, 1, 0,
                    0, 0, 1  ]; // HURR DURR. WE NO USE LEFT HANDED CONVENTION
                
        if( VALID( array ) )
        {
            ASSERT_LENGTH( array, 9 );
    
            for( var i = 0; i < 9; i++ )
                this.data[ i ] = array[ i ];
        }


    }
    
    
    Matrix33.prototype.Identity = function ()
    {
          for( var i = 0; i < 3; i++ )
            for( var j = 0; j < 3; j++ )
                 this.data[i*3+j] = ( i == j) ? 1.0 : 0.0; 
    }
    

    Matrix33.prototype.RotationX = function( rads )
    {
        this.data[0] = 1; this.data[1] =               0; this.data[2] =              0;
        this.data[3] = 0; this.data[4] =  Math.cos(rads); this.data[5] = Math.sin(rads);
        this.data[6] = 0; this.data[7] = -Math.sin(rads); this.data[8] = Math.cos(rads);
    }
    
    Matrix33.prototype.RotationY = function( rads )
    {
         this.data[0] =  Math.cos(rads); this.data[1] = 0; this.data[2] = -Math.sin(rads);
         this.data[3] =            0;    this.data[4] = 1; this.data[5] = 0;
         this.data[6] =  Math.sin(rads); this.data[7] = 0; this.data[8] =  Math.cos(rads);
    }
    
    Matrix33.prototype.RotationZ = function( rads ) 
    {
        this.data[0] =  Math.cos(rads); this.data[1] = Math.sin(rads); this.data[2] = 0;
        this.data[3] = -Math.sin(rads); this.data[4] = Math.cos(rads); this.data[5] = 0;
        this.data[6] =               0; this.data[7] =              0; this.data[8] = 1;
    }
    
    Matrix33.prototype.Scale = function( scales ) 
    {
        this.data[0] = scales.x; this.data[1] =         0; this.data[2] =          0;
        this.data[3] =        0; this.data[4] =  scales.y; this.data[5] =          0;
        this.data[6] =        0; this.data[7] =         0; this.data[8] =   scales.z;
    }
    

    Matrix33.prototype.multiply = function( mat )
    {
        ASSERT_TYPE( Matrix33, mat, "Expected Matrix33 for valid 3x3 Matrix multiplication");
        
        var ret = new Matrix33();

        for( var i = 0; i < 3; i++ )
            for( var j = 0; j < 3; j++ )
            {
                ret.data[(3*i)+j] = mat.data[ 3*i   ] * this.data[0+j] + 
                                    mat.data[(3*i)+1] * this.data[3+j] + 
                                    mat.data[(3*i)+2] * this.data[6+j];
            }
       
    return ret;
    }


    Matrix33.prototype.transposed = function()
    {
        var ret = new Matrix33();
       
        for( var i = 0; i < 3; i++ )
            for( var j = 0; j < 3; j++ )
            {
               ret.data[ (3*j)+i] = this.data[ (3*i)+j ];
            }
            
    return ret;
    }


    Matrix33.prototype.alert = function() 
    {       
        var msg = "";
        
        for( var r = 0; r < 3; r++ )
        {
            msg += "[ ";
            for( var c = 0; c < 3; c++ )
            {
                var val  = this.data[ 3*r + c ];
                    val  = ( Math.abs(val) < EPSILON ) ? 0 : val;
                    msg += val;
                    msg += " "; 
            }
            msg += "] \n";
        }
        
    alert( msg );
    }
    
    

    Matrix33.prototype.extract_I = function()
    {
        return new Vector3( this.data[0], this.data[1], this.data[2] );
    }
    
    Matrix33.prototype.extract_J = function()
    {
        return new Vector3( this.data[3], this.data[4], this.data[5] );
    }    
    
    Matrix33.prototype.extract_K = function()
    {
        return new Vector3( this.data[6], this.data[7], this.data[8] );
    }    