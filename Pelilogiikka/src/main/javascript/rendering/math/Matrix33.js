
Matrix33.prototype.identity = function ()
{
    this.m11 = 1; this.m12 = 0; this.m13 = 0;
    this.m21 = 0; this.m22 = 1; this.m23 = 0;
    this.m31 = 0; this.m32 = 0; this.m33 = 1;
}


function Matrix33( args )
{
   if( args == 'ID') this.identity();
}


Matrix33.multiply = function( mat33 )
{
    var mtx = new Matrix33();
        
    mtx.m11 = mat44.m11*this.m11 + mat44.m12*this.m21 + mat44.m13*this.m31;
    mtx.m12 = mat44.m11*this.m12 + mat44.m12*this.m22 + mat44.m13*this.m32;
    mtx.m13 = mat44.m11*this.m13 + mat44.m12*this.m32 + mat44.m13*this.m33;
       
    mtx.m21 = mat44.m21*this.m11 + mat44.m22*this.m21 + mat44.m23*this.m31;
    mtx.m22 = mat44.m21*this.m12 + mat44.m22*this.m22 + mat44.m23*this.m32;
    mtx.m23 = mat44.m21*this.m13 + mat44.m22*this.m32 + mat44.m23*this.m33;
       
    mtx.m31 = mat44.m31*this.m11 + mat44.m32*this.m21 + mat44.m33*this.m31;
    mtx.m32 = mat44.m31*this.m12 + mat44.m32*this.m22 + mat44.m33*this.m32;
    mtx.m33 = mat44.m31*this.m13 + mat44.m32*this.m32 + mat44.m33*this.m33;

 return mtx;
}



