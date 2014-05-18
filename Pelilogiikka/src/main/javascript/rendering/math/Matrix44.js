
    Matrix44.prototype.identity = function ()   
    {
        this.m11 = 1; this.m12 = 0; this.m13 = 0; this.m14 = 0;
        this.m21 = 0; this.m22 = 1; this.m23 = 0; this.m24 = 0;
        this.m31 = 0; this.m32 = 0; this.m33 = 1; this.m34 = 0;
        this.m41 = 0; this.m42 = 0; this.m43 = 0; this.m44 = 1;
    }


    function Matrix44( args )
    {
        if( args[0] == 'ID'){ this.identity(); return;}
    }




    Matrix44.embed = function( mat33 ) 
    {
        this.m11 = mat33.m11; this.m12 = mat33.m12; this.m13 = mat33.m13; this.m14 = 0;
        this.m21 = mat33.m21; this.m22 = mat33.m22; this.m23 = mat33.m23; this.m24 = 0;
        this.m31 = mat33.m31; this.m32 = mat33.m32; this.m33 = mat33.m33; this.m34 = 0;
        this.m41 =         0; this.m42 =         0; this.m43 =         0; this.m44 = 1;
    }



    Matrix44.multiply = function( mat44 )
    {
        var mtx = new Matrix44();
        
        mtx.m11 = mat44.m11*this.m11 + mat44.m12*this.m21 + mat44.m13*this.m31 + mat44.m14*this.m41;
        mtx.m12 = mat44.m11*this.m12 + mat44.m12*this.m22 + mat44.m13*this.m32 + mat44.m14*this.m42;
        mtx.m13 = mat44.m11*this.m13 + mat44.m12*this.m32 + mat44.m13*this.m33 + mat44.m14*this.m43;
        mtx.m14 = mat44.m11*this.m14 + mat44.m12*this.m42 + mat44.m13*this.m34 + mat44.m14*this.m44;
       
        mtx.m21 = mat44.m21*this.m11 + mat44.m22*this.m21 + mat44.m23*this.m31 + mat44.m24*this.m41;
        mtx.m22 = mat44.m21*this.m12 + mat44.m22*this.m22 + mat44.m23*this.m32 + mat44.m24*this.m42;
        mtx.m23 = mat44.m21*this.m13 + mat44.m22*this.m32 + mat44.m23*this.m33 + mat44.m24*this.m43;
        mtx.m24 = mat44.m21*this.m14 + mat44.m22*this.m42 + mat44.m23*this.m34 + mat44.m24*this.m44;
       
        mtx.m31 = mat44.m31*this.m11 + mat44.m32*this.m21 + mat44.m33*this.m31 + mat44.m34*this.m41;
        mtx.m32 = mat44.m31*this.m12 + mat44.m32*this.m22 + mat44.m33*this.m32 + mat44.m34*this.m42;
        mtx.m33 = mat44.m31*this.m13 + mat44.m32*this.m32 + mat44.m33*this.m33 + mat44.m34*this.m43;
        mtx.m34 = mat44.m31*this.m14 + mat44.m32*this.m42 + mat44.m33*this.m34 + mat44.m34*this.m44;
        
        mtx.m41 = mat44.m41*this.m11 + mat44.m42*this.m21 + mat44.m43*this.m31 + mat44.m44*this.m41;
        mtx.m42 = mat44.m41*this.m12 + mat44.m42*this.m22 + mat44.m43*this.m32 + mat44.m44*this.m42;
        mtx.m43 = mat44.m41*this.m13 + mat44.m42*this.m32 + mat44.m43*this.m33 + mat44.m44*this.m43;
        mtx.m44 = mat44.m41*this.m14 + mat44.m42*this.m42 + mat44.m43*this.m34 + mat44.m44*this.m44;
    
    return mtx;
    }



