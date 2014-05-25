
    Matrix44.prototype.identity = function ()   
    {
        this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
        this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
        this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
        this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
    }


    function Matrix44( args )
    {
        if( args == null ) return;
        
        if( args[0] == 'ID' )
        {
            this.identity(); 
            return;
        }
        
   
        if( args[0] == 'TRANS' )
        {
           var vec = args[1];
           
           this.identity(); 
           this.m41 = vec.x;
           this.m42 = vec.y;
           this.m43 = vec.z;
           
        return;  
        }    
          
        if( args[0] == 'SCALE' )
        {
           var axis = args[1];
           
           this.identity(); 
           this.m11 = axis.x;
           this.m22 = axis.y;
           this.m33 = axis.z;
           
        return;
        }    
        
        
         // Rotate around arbitrary axis
        if( args[0] == "ROT_A" )
        {
             this.identity();
            
             var axis = args[1];
             var rads = args[2];
             
             var s = Math.sin(rads);
             var c = Math.cos(rads);
             var t = 1-c;
            
             var a00 = this.m11, a01 = this.m12, a02 = this.m13, a03 =  this.m14;
             var a10 = this.m21, a11 = this.m22, a12 = this.m23, a13 =  this.m24;
             var a20 = this.m31, a21 = this.m32, a22 = this.m33, a23 =  this.m34;
        
             var x = axis.x;
             var y = axis.y;
             var z = axis.z;
        
             // Construct the elements of the rotation matrix
             var b00 = x*x*t + c, b01 = y*x*t + z*s, b02 = z*x*t - y*s;
             var b10 = x*y*t - z*s, b11 = y*y*t + c, b12 = z*y*t + x*s;
             var b20 = x*z*t + y*s, b21 = y*z*t - x*s, b22 = z*z*t + c;
        
        
            // Perform rotation-specific matrix multiplication
            this.m11 = a00*b00 + a10*b01 + a20*b02;
            this.m12 = a01*b00 + a11*b01 + a21*b02;
            this.m13 = a02*b00 + a12*b01 + a22*b02;
            this.m14 = a03*b00 + a13*b01 + a23*b02;
        
            this.m21 = a00*b10 + a10*b11 + a20*b12;
            this.m22 = a01*b10 + a11*b11 + a21*b12;
            this.m23 = a02*b10 + a12*b11 + a22*b12;
            this.m24 = a03*b10 + a13*b11 + a23*b12;
        
            this.m31 = a00*b20 + a10*b21 + a20*b22;
            this.m32 = a01*b20 + a11*b21 + a21*b22;
            this.m33 = a02*b20 + a12*b21 + a22*b22;
            this.m34 = a03*b20 + a13*b21 + a23*b22;
        
            this.m41 = 0;
            this.m42 = 0;
            this.m43 = 0;
            this.m44 = 1;
        
        return;
        }
        
       
    }




    Matrix44.prototype.embed = function( mat33 ) 
    {
        this.m11 = mat33.m11; this.m12 = mat33.m12; this.m13 = mat33.m13; this.m14 = 0;
        this.m21 = mat33.m21; this.m22 = mat33.m22; this.m23 = mat33.m23; this.m24 = 0;
        this.m31 = mat33.m31; this.m32 = mat33.m32; this.m33 = mat33.m33; this.m34 = 0;
        this.m41 =         0; this.m42 =         0; this.m43 =         0; this.m44 = 1;
    }



    Matrix44.prototype.multiply = function( mat )
    {
        var mtx = new Matrix44();
        
        mtx.m11 = mat.m11*this.m11 + mat.m12*this.m21 + mat.m13*this.m31 + mat.m14*this.m41;
        mtx.m12 = mat.m11*this.m12 + mat.m12*this.m22 + mat.m13*this.m32 + mat.m14*this.m42;
        mtx.m13 = mat.m11*this.m13 + mat.m12*this.m23 + mat.m13*this.m33 + mat.m14*this.m43;
        mtx.m14 = mat.m11*this.m14 + mat.m12*this.m24 + mat.m13*this.m34 + mat.m14*this.m44;
       
        mtx.m21 = mat.m21*this.m11 + mat.m22*this.m21 + mat.m23*this.m31 + mat.m24*this.m41;
        mtx.m22 = mat.m21*this.m12 + mat.m22*this.m22 + mat.m23*this.m32 + mat.m24*this.m42;
        mtx.m23 = mat.m21*this.m13 + mat.m22*this.m23 + mat.m23*this.m33 + mat.m24*this.m43;
        mtx.m24 = mat.m21*this.m14 + mat.m22*this.m24 + mat.m23*this.m34 + mat.m24*this.m44;
       
        mtx.m31 = mat.m31*this.m11 + mat.m32*this.m21 + mat.m33*this.m31 + mat.m34*this.m41;
        mtx.m32 = mat.m31*this.m12 + mat.m32*this.m22 + mat.m33*this.m32 + mat.m34*this.m42;
        mtx.m33 = mat.m31*this.m13 + mat.m32*this.m23 + mat.m33*this.m33 + mat.m34*this.m43;
        mtx.m34 = mat.m31*this.m14 + mat.m32*this.m24 + mat.m33*this.m34 + mat.m34*this.m44;
        
        mtx.m41 = mat.m41*this.m11 + mat.m42*this.m21 + mat.m43*this.m31 + mat.m44*this.m41;
        mtx.m42 = mat.m41*this.m12 + mat.m42*this.m22 + mat.m43*this.m32 + mat.m44*this.m42;
        mtx.m43 = mat.m41*this.m13 + mat.m42*this.m32 + mat.m43*this.m33 + mat.m44*this.m43;
        mtx.m44 = mat.m41*this.m14 + mat.m42*this.m24 + mat.m43*this.m34 + mat.m44*this.m44;
    
    return mtx;
    }




    Matrix44.prototype.report = function()
    {
        alert("[ "+this.m11 +" , "+ this.m12 + " , " +this.m13+" , " +this.m14+" ] \n" +
              "[ "+this.m21 +" , "+ this.m22 + " , " +this.m23+" , " +this.m24+" ] \n" +
              "[ "+this.m31 +" , "+ this.m32 + " , " +this.m33+" , " +this.m34+" ] \n" +
              "[ "+this.m41 +" , "+ this.m42 + " , " +this.m43+" , " +this.m44+" ] \n" );
    }




    Matrix44.prototype.perspective = function( canvas, nearPlane, farPlane ) 
    {
      // REWRITE
      var ratio  = canvas.clientWidth / canvas.clientHeight;
      var left   = -ratio;
      var right  = ratio;
      var bottom = -1.0;
      var top    = 1.0;
      var near   = nearPlane;
      var far    = farPlane;
      
        var rl = (right - left);
        var tb = (top - bottom);
        var fn = (far - near);
        
      var retMatrix = new Matrix44();
        
          retMatrix.m11 = (near*2) / rl;       retMatrix.m12 =           0.0;       retMatrix.m13 = 0.0;                retMatrix.m14 =  0.0;
          retMatrix.m21 =  0.0;                retMatrix.m22 = (near*2) / tb;       retMatrix.m23 = 0.0;                retMatrix.m24 =  0.0;
          retMatrix.m31 = (right + left) / rl; retMatrix.m32 = (top + bottom) / tb; retMatrix.m33 = -(far + near) / fn; retMatrix.m34 = -1.0;
          retMatrix.m41 = 0.0;                 retMatrix.m42 = 0.0;                 retMatrix.m43 = -(far*near*2) / fn; retMatrix.m44 = 0.0;
        
    return retMatrix;
    }
   
    
    Matrix44.prototype.toGLMatrix = function()
    {
        var retArray = [ this.m11, this.m12, this.m13, this.m14,
                         this.m21, this.m22, this.m23, this.m24,
                         this.m31, this.m32, this.m33, this.m34,
                         this.m41, this.m42, this.m43, this.m44 ];
    return retArray;
    }