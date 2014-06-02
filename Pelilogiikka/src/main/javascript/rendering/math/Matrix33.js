

    function Matrix33()
    { 
      this.data = [ 1, 0, 0,
                    0, 1, 0,
                    0, 0,-1, ]; // HURR DURR. WE NO USE LEFT HANDED CONVENTION
    }
    
    
    Matrix33.prototype.Identity = function ()
    {
          for( var i = 0; i < 3; i++ )
            for( var j = 0; j < 3; j++ )
                 this.data[i*3+j] = ( i == j) ? 1.0 : 0.0; 
   
    this.data[8] *= -1; // RIGHT HANDED SHIT.
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
    
    Matrix33.prototype.ScaleZ = function( scales ) 
    {
        this.data[0] = scales.x; this.data[1] =         0; this.data[2] =          0;
        this.data[3] =        0; this.data[4] =  scales.y; this.data[5] =          0;
        this.data[6] =        0; this.data[7] =         0; this.data[8] =   scales.z;
    }
    

    Matrix33.prototype.multiply = function( mat )
    {
        ASSERT_TYPE( Matrix33, mat, "Expected Matrix33 for valid 3x3 Matrix multiplication");
        
        var ret    = new Matrix33();

        for( var i = 0; i < 3; i++ )
        {  
            for( var j = 0; j < 3; j++ )
            {
                ret.data[(3*i)+j] = mat.data[3*i]*this.data[0+j] + mat.data[(3*i)+1]*this.data[3+j] + mat.data[(3*i)+2]*this.data[6+j];
            }
        }
        
        /*
        ret.data[0] = mat.data[0]*this.data[0] + mat.data[1]*this.data[3] + mat.data[2]*this.data[6];
        ret.data[1] = mat.data[0]*this.data[1] + mat.data[1]*this.data[4] + mat.data[2]*this.data[7];
        ret.data[2] = mat.data[0]*this.data[2] + mat.data[1]*this.data[5] + mat.data[2]*this.data[8];
       
        ret.data[3] = mat.data[3]*this.data[0] + mat.data[4]*this.data[3] + mat.data[5]*this.data[6];
        ret.data[4] = mat.data[3]*this.data[1] + mat.data[4]*this.data[4] + mat.data[5]*this.data[7];
        ret.data[5] = mat.data[3]*this.data[2] + mat.data[4]*this.data[5] + mat.data[5]*this.data[8];
       
        ret.data[6] = mat.data[6]*this.data[0] + mat.data[7]*this.data[3] + mat.data[8]*this.data[6];
        ret.data[7] = mat.data[6]*this.data[1] + mat.data[7]*this.data[4] + mat.data[8]*this.data[7];
        ret.data[8] = mat.data[6]*this.data[2] + mat.data[7]*this.data[5] + mat.data[8]*this.data[8];
        */
       // Ref
       
    return ret;
    }


    Matrix33.prototype.report = function()
    {
        alert("[ "+this.data[0] +" , "+ this.data[1] + " , " +this.data[2]+" ] \n" +
              "[ "+this.data[3] +" , "+ this.data[4] + " , " +this.data[5]+" ] \n" +
              "[ "+this.data[6] +" , "+ this.data[7] + " , " +this.data[8]+" ] \n" );
    }


    Matrix33.prototype.is_Orthonormal = function() 
    {
        var I = this.extract_I();
        var J = this.extract_J();
        var K = this.extract_K();
        
        var dot1 = I.dot( J );
        var dot2 = J.dot( K );
        var dot3 = I.dot( K );
        
        if( dot1 != 0 || dot2 != 0 || dot3 != 0 ) return false;                     // Orthonormal is god damn orthonormal! Even numeric accuracy cant fuck this up
    
        var length1 = I.length();
        var length2 = J.length();
        var length3 = K.length();
        
        if( length1 != 1.0 || length2 != 1.0 || length3 != 1.0 ) return false;      // EPSILON?!?!?!
        
    return true;
    }
    
    
      

    Matrix33.prototype.extract_I = function()
    {
        return new Vector( this.data[0], this.data[1], this.data[2] );
    }
    
    Matrix33.prototype.extract_J = function()
    {
        return new Vector( this.data[3], this.data[4], this.data[5] );
    }    
    
    Matrix33.prototype.extract_K = function()
    {
        return new Vector( this.data[6], this.data[7], this.data[8] );
    }    