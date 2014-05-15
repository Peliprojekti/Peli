

    
    function Camera()     
    {
      this.angle_Yaw   = 0;
      this.angle_Pitch = 0;
      this.angle_Roll  = 0;
        
      this.position     = [0,0,0];
      this.orientation  = mat4.create();
                          mat4.identity( this.orientation );                  
    }


    Camera.prototype.get_ViewMatrix = function()
    {
       //    var  ret = mat4.transpose( this.orientation );             
       //    return ret; 
     
       var viewMatrix = mat4.create();
                        mat4.identity( viewMatrix );
        
         mat4.rotate(viewMatrix, -this.angle_Pitch, [1, 0, 0] );
         mat4.rotate(viewMatrix, -this.angle_Yaw,   [0, 1, 0] );
         mat4.rotate(viewMatrix, -this.angle_Roll,  [0, 0, 1] );
         
         mat4.translate(viewMatrix, [ -this.position[0], 
                                      -this.position[1], 
                                      -this.position[2]  ]);
              
    return viewMatrix;
    }
     
     
     
     
    Camera.prototype.get_Direction = function()
    {
        var matrix = mat4.create();
                     mat4.identity( matrix );
        
         mat4.rotate(matrix, this.angle_Pitch, [1, 0, 0] );
         mat4.rotate(matrix, this.angle_Yaw,   [0, 1, 0] );
         mat4.rotate(matrix, this.angle_Roll,  [0, 0, 1] );
        
        return [ matrix[8], matrix[9], matrix[10] ];
    }
   
     
    Camera.prototype.pitch = function( radians ) 
    {
       this.angle_Pitch += radians;
    }	

    Camera.prototype.yaw = function( radians )
    {
      this.angle_Yaw += radians;
    }

    Camera.prototype.roll = function( radians ) 
    {
     this.angle_Roll += radians;
    }
	
        
    Camera.prototype.forward = function( units )
    {
        var dir = this.get_Direction();
        vec3.scale( dir, -units );                          // RIGHT HANDED coordinate system apparently :/  [1,0,0] [0,1,0], [0,0,-1] !
        vec3.add( this.position, dir, this.position );
    };
  
    Camera.prototype.backward = function( units )
    {
        var dir = this.get_Direction();
        vec3.scale( dir,  units );                         // RIGHT HANDED coordinate system apparently :/  [1,0,0] [0,1,0], [0,0,-1] !
        vec3.add( this.position, dir, this.position );
    };
  
        
        
    Camera.prototype.move = function( displacement )
    {
        vec3.add( this.position, displacement, this.position );
    }
  


