

    
    function Camera()     
    {
      this.pitch = 0;
      this.yaw   = 0;
      this.roll  = 0;
        
      this.position     = [0,0,0];
      this.orientation  = mat4.create();
                          mat4.identity( this.orientation );                  
    }


    Camera.prototype.get_ViewMatrix = function()
    {
       //    var  ret = mat4.transpose( this.orientation );             
       //    return ret; 
     
       var viewMatrix = mat4.create();
        
         mat4.rotate(viewMatrix, -this.pitch, [1, 0, 0]);
         mat4.rotate(viewMatrix, -this.yaw,  [0, 1, 0]);
         mat4.rotate(viewMatrix, -this.roll, [0, 0, 1]);
         
         mat4.translate(viewMatrix, [ -this.position[0], 
                                      -this.position[1], 
                                      -this.position[2]  ]);
              
    return viewMatrix;
    }
     
    Camera.prototype.pitch = function( radians ) 
    {
        mat4.rotate( this.orientation, radians, [1,0,0], 0 );
    }	

    Camera.prototype.yaw = function( radians )
    {
        mat4.rotate( this.orientation, radians, [0,1,0], 0 );
    }

    Camera.prototype.roll = function( radians ) 
    {
        mat4.rotate( this.orientation, radians, [0,0,1], 0 );
    }
	
    Camera.prototype.move = function( displacement )
    {
        vec3.add( this.position, displacement, this.position );
    }
    