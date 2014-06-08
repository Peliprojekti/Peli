//  LeftPoint-----------RightPoint
//           \         /
//            \       /
//             \     /
//              \   /
//               \ /
//              Origin
function ViewTriangle( origin3, look3,  lTrans, rTrans, farPlaneDist )
{
   
    this.look       = new Vector2( look3.x, look3.z );
    var left        = lTrans.transform( this.look );
    var right       = rTrans.transform( this.look );
    
    var farLook      = this.look.multiply( farPlaneDist );
      
    var left_Side    = farLook.projected( left  );
    var right_Side   = farLook.projected( right );
   
    left.alert();
   
    this.origin      = new Vector2( origin3.x, origin3.z );
    this.left_Point  = this.origin.add( left_Side  );
    this.right_Point = this.origin.add( right_Side ); 
    
    this.left_Point.alert();
}


function Camera(  position  )
{
    this.position    = position;
    this.orientation = new Matrix33();
    
    this.vertical_Fov = 60;
    this.aspectRatio  = 1.3333;
    this.nearPlane    = 1.0;
    this.farPlane     = 500;
    
    
    // Parameters to make viewTriangle creation faster
    this.fov     = this.vertical_Fov / this.aspectRatio; // Does this even make sense? ~ w/h = fov_V / fov_H 
    this.lTrans  = new Matrix22();
    this.rTrans  = new Matrix22();
    this.lTrans.Rotation(  DegToRad(this.fov)  );
    this.rTrans.Rotation(  DegToRad(-this.fov) );
    
    
    var look = this.orientation.extract_K();
   
    this.frustrum = new ViewTriangle( this.position,
                                      look,
                                      this.lTrans,
                                      this.rTrans,
                                      this.farPlane );
 
     
}




Camera.prototype.forward = function( amount )
{
    var look = this.orientation.extract_K();
    this.position = this.position.add( look.multiply( -amount ) );
}


Camera.prototype.backwards = function( amount )
{
    var look = this.orientation.extract_K();
    this.position = this.position.add(  look.multiply( amount ) );
}



Camera.prototype.up = function( amount )
{
    var look = this.orientation.extract_J();
    this.position = this.position.add( look.multiply( amount ) );
}


Camera.prototype.down = function( amount )
{
    var look = this.orientation.extract_J();
    this.position = this.position.add(  look.multiply( -amount ) );
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
        
        
    var lol = new Matrix44();
        lol.data[ 12 ] = -this.position.x;
        lol.data[ 13 ] = -this.position.y;
        lol.data[ 14 ] = -this.position.z;

return ret.multiply( lol );
}



Camera.prototype.get_ProjectionMatrix = function()
{
    var ret    = new Matrix44();
    
    var top    = this.nearPlane*Math.tan(this.vertical_Fov*Math.PI / 360.0);
    var right  = top*this.aspectRatio;
    var left   = -right;
    var bottom = -top;
    var near   = this.nearPlane;
    var far    = this.farPlane;
    
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
    
    // Mirror the projection matrix along X
    var mirror = new Matrix44( [-1,0,0,0,
                                0,1,0,0,
                                0,0,1,0,
                                0,0,0,1] );
                                
     
    ret = ret.multiply( mirror );
    
    
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











