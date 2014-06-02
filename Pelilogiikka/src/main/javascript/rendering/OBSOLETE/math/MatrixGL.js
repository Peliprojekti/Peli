

// To be intagrated later!
    function MatrixGL( mat )
    {
        this.mtx[0]  = mat.m11; this.mtx[1]  = mat.m12; this.mtx[2]   = mat.m13; this.mtx[3 ]  = mat.m14; 
        this.mtx[4]  = mat.m21; this.mtx[5]  = mat.m22; this.mtx[6]   = mat.m23; this.mtx[7 ]  = mat.m24; 
        this.mtx[8]  = mat.m31; this.mtx[9]  = mat.m32; this.mtx[10]  = mat.m33; this.mtx[11] = mat.m34; 
        this.mtx[12] = mat.m41; this.mtx[13] = mat.m42; this.mtx[14]  = mat.m43; this.mtx[15] = mat.m44; 
    }

    MatrixGL.prototype.identity = function ()
    {
       this.mtx[0]  = 1.0; this.mtx[1]  = 0.0; this.mtx[2]   = 0.0; this.mtx[3]  = 0.0; 
       this.mtx[4]  = 0.0; this.mtx[5]  = 1.0; this.mtx[6]   = 0.0; this.mtx[7]  = 0.0; 
       this.mtx[8]  = 0.0; this.mtx[9]  = 0.0; this.mtx[10]  = 1.0; this.mtx[11] = 0.0; 
       this.mtx[12] = 0.0; this.mtx[13] = 0.0; this.mtx[14]  = 0.0; this.mtx[15] = 1.0; 
    }
    
    MatrixGL.prototype.bind = function( gl, shaderRef )
    {
        gl.uniformMatrix4fv( shaderRef , false,  this.mtx  );
    }