
    function Entity( mesh , material )
    {
        
        this.mesh         = mesh;
        this.material     = material;              
        
        this.position     = [0,0,-15];
        this.scales       = [1,1,1];
        this.angle_Yaw    = 0;
        this.angle_Pitch  = 0;
        this.angle_Roll   = 0;
        
        this.orientation  = mat4.create();
        mat4.identity(  this.orientation );
     }
    
    
    Entity.prototype.get_Transformation = function()
    { 
        /*
        var world = mat4.create();      
                    mat4.identity(  world                         );
                    mat4.translate( world, this.position,  world  );   // Temporary HAX for the camera
                    mat4.scale    ( world, this.scales,    world  );
                    mat4.multiply(  world,this.orientation, world );
                                     
    return  world;
    */
      var worldMatrix = mat4.create();
                        mat4.identity( worldMatrix );
        
        
         mat4.translate( worldMatrix, [  this.position[0], 
                                         this.position[1], 
                                         this.position[2]  ]);
        
        
         mat4.rotate(worldMatrix,  this.angle_Pitch, [1, 0, 0] );
         mat4.rotate(worldMatrix,  this.angle_Yaw,   [0, 1, 0] );
         mat4.rotate(worldMatrix,  this.angle_Roll,  [0, 0, 1] );
         
         

                   
               
    
    return worldMatrix;
    }
    
           
    Entity.prototype.draw = function( gl )
    {
        this.mesh.vertices.bind ( gl, this.material.shader.shaderProgram.vertexPositionAttribute );    
        this.mesh.texCoords.bind( gl, this.material.shader.shaderProgram.textureCoordAttribute   );
              this.material.bind( gl, gl.TEXTURE0                                                );
        
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indices.data );    
        gl.drawElements(gl.TRIANGLES, this.mesh.indices.data.numItems, gl.UNSIGNED_SHORT, 0);
    }
              
       
       
       
       
    Entity.prototype.set_Position = function( point )
    {
        this.position = point;
    }
	
    Entity.prototype.move = function( displacement )
    {
        vec3.add( this.position, displacement, this.position );
    }
		
    Entity.prototype.pitch = function( radians ) 
    {
       this.angle_Pitch += radians;
    }	
	
    Entity.prototype.yaw = function( radians ) 
    {
       this.angle_Yaw += radians;
    }
	
    Entity.prototype.roll = function( radians ) 
    {
      this.angle_Roll += radians;
    }
		
                
                
    Entity.prototype.scale = function( axes ) 
    {
	this.scales[0] = axes[0];
        this.scales[1] = axes[1];
        this.scales[2] = axes[2];    
    }