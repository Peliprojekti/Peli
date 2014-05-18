
Matrix33.prototype.identity = function ()
{
    this.m11 = 1; this.m12 = 0; this.m13 = 0;
    this.m21 = 0; this.m22 = 1; this.m23 = 0;
    this.m31 = 0; this.m32 = 0; this.m33 = 1;
}


function Matrix33( args )
{
   if( args[0] == 'ID')
   {
       this.identity(); 
       return;
   }

  

   if( args[0] == "ROT_Z" )
   {
        var r    = args[1];
        
        this.m11 =  Math.cos(r); this.m12 = Math.sin(r); this.m13 = 0;
        this.m21 = -Math.sin(r); this.m22 = Math.cos(r); this.m23 = 0;
        this.m31 =            0; this.m32 =           0; this.m33 = 1;
  
   return;
   }
   
   if( args[0] == "ROT_Y" )
   {
        var r    = args[1];
        this.m11 =  Math.cos(r); this.m12 =           0; this.m13 = -Math.sin(r);
        this.m21 =            0; this.m22 =           1; this.m23 = 0;
        this.m31 =  Math.sin(r); this.m32 =           0; this.m33 =  Math.cos(r);
  
   return;
   }
   
   if( args[0] == "ROT_X" )
   {
        var r    = args[1];
        this.m11 =            1; this.m12 =            0; this.m13 =           0;
        this.m21 =            0; this.m22 =  Math.cos(r); this.m23 = Math.sin(r);
        this.m31 =            0; this.m32 = -Math.sin(r); this.m33 = Math.cos(r);
  
   return;
   }


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

    Matrix33.transpose = function()
    {
        var mtx = new Matrix33();
        
        mtx.m11 = this.m11;
        mtx.m12 = this.m21;
        mtx.m13 = this.m31;
 
        mtx.m21 = this.m12;
        mtx.m22 = this.m22;
        mtx.m23 = this.m32;

        mtx.m31 = this.m13;
        mtx.m32 = this.m23;
        mtx.m33 = this.m33;
   
    return mtx;
    }

    // x,y,z    /// R1,
                //  R2     ->  xR1 + yR2 + zR3
                //  R3  

    Matrix33.prototype.transform = function( vec3 )
    {
        var vOut = new Vector3( (vec3.x * this.m11 + vec3.y * this.m21 + vec3.z * this.m31),
                                (vec3.x * this.m12 + vec3.y * this.m22 + vec3.z * this.m32),
                                (vec3.x * this.m13 + vec3.y * this.m23 + vec3.z * this.m33));
                                
    return vOut;
    }




    Matrix33.prototype.report = function()
    {
        alert("[ "+this.m11 +" , "+ this.m12 + " , " +this.m13+" ] \n" +
              "[ "+this.m21 +" , "+ this.m22 + " , " +this.m23+" ] \n" +
              "[ "+this.m31 +" , "+ this.m32 + " , " +this.m33+" ] \n" );
    }
