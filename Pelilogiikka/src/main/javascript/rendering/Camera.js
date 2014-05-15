

    
    function Camera()     
    {
      this.position     = [0,0,0];
      this.orientation = mat4.create();
                         mat4.identity( this.orientation );                  
    }


    Camera.prototype.get_ViewMatrix = function()
    {    
          var inv;
                  
                    mat4.transpose( this.orientation, inv );       
                    mat4[12] = this.position[0];
                    mat4[13] = this.position[1];
                    mat4[14] = this.position[2];
                    
       return this.orientation; inv;
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
    