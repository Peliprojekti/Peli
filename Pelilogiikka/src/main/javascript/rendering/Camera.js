

    
    function Camera()     
    {
      this.position     = [0,0,0];
      this.orientation = mat4.create();
                         mat4.identity( this.orientation );                  
    }


    Camera.prototype.get_ViewMatrix = function()
    {
        var ret = mat4.transpose( this.orientation);    
         
       return ret; 
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
    