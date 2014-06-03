



function Camera(  position  )
{
    this.position    = position;
    this.orientation = new Matrix33();
}





Camera.prototype.forward = function( amount )
{
    var look = this.orientation.extract_K();
    this.position.add(  look.multiply( amount ) );
}


Camera.prototype.backwards = function( amount )
{
    var look = this.orientation.extract_K();
    this.position.add(  look.multiply( -amount ) );
}


Camera.prototype.yaw = function( amount )
{
    var rotMatrix = new Matrix33();
        rotMatrix.RotationY( DegToRad( amount ) );
        
    this.orientation = this.orientation.multiply( rotMatrix );
}

Camera.prototype.pitch = function( amount )
{
    var rotMatrix = new Matrix33();
        rotMatrix.RotationX( DegToRad( amount ) );
        
    this.orientation = this.orientation.multiply( rotMatrix );
}

Camera.prototype.roll = function( amount )
{
    var rotMatrix = new Matrix33();
        rotMatrix.RotationZ( DegToRad( amount ) );
        
    this.orientation = this.orientation.multiply( rotMatrix );
}


Camera.prototype.get_ViewMatrix = function()
{ 
    var ret = new Matrix44();
        ret.embed( this.orientation.transposed() );    
        
        ret.data[ 12 ] = -this.position.x;
        ret.data[ 13 ] = -this.position.y;
        ret.data[ 14 ] = -this.position.z;

return ret;
}



Camera.prototype.get_ProjectionMatrix = function( vertical_Fov, aspectRatio, nearPlane, farPlane )
{
    var ret    = new Matrix44();
    
    var top    = nearPlane*Math.tan(vertical_Fov*Math.PI / 360.0);
    var right  = top*aspectRatio;
    var left   = -right;
    var bottom = -top;
    var near   = nearPlane;
    var far    = farPlane;
    
    var rl     = (right - left);
    var tb     = (top - bottom);
    var fn     = (far - near);
    
       ret.data[0 ] = (near*2) / rl;
       ret.data[1 ] = 0;
       ret.data[2 ] = 0;
       ret.data[3 ] = 0; 
       ret.data[4 ] = 0;
       ret.data[5 ] = (near*2) / tb;
       ret.data[6 ] = 0;
       ret.data[7 ] = 0;
       ret.data[8 ] = (right + left) / rl;
       ret.data[9 ] = (top + bottom) / tb;
       ret.data[10] = -(far + near) / fn;
       ret.data[11] = -1;
       ret.data[12] = 0;
       ret.data[13] = 0;
       ret.data[14] = -(far*near*2) / fn;
       ret.data[15] = 0;  
    
return ret;
}




/*
  
 mat4.perspective = function(fovy, aspect, near, far, dest) {
        var top = near*Math.tan(fovy*Math.PI / 360.0);
        var right = top*aspect;
        return mat4.frustum(-right, right, -top, top, near, far, dest);
};


mat4.frustum = function(left, right, bottom, top, near, far, dest) {
        if(!dest) { dest = mat4.create(); }
        var rl = (right - left);
        var tb = (top - bottom);
        var fn = (far - near);
        dest[0] = (near*2) / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = (near*2) / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = (right + left) / rl;
        dest[9] = (top + bottom) / tb;
        dest[10] = -(far + near) / fn;
        dest[11] = -1;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = -(far*near*2) / fn;
        dest[15] = 0;
        return dest;
};

*/











