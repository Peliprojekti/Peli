


function MatrixGL( mat )
{
    this[0]  = mat.m11; this[1]  = mat.m12; this[2]   = mat.m13; this[3]  = mat.m14; 
    this[4]  = mat.m21; this[5]  = mat.m22; this[6]   = mat.m23; this[7]  = mat.m24; 
    this[8]  = mat.m31; this[9]  = mat.m32; this[10]  = mat.m33; this[11] = mat.m34; 
    this[12] = mat.m41; this[13] = mat.m42; this[14]  = mat.m43; this[15] = mat.m44; 
}
