	
	
    function Buffer( gl, item_Type, itemList, entrySize ) 
    {             
        this.data           = gl.createBuffer();		
        this.data.itemSize  = entrySize;
        this.data.numItems  = itemList.length / entrySize;
		
        
        
        if( item_Type === "FLOAT")
        { 
              gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( itemList ), gl.STATIC_DRAW);   
              this.itemType = gl.FLOAT;
        } 
         else
           if( item_Type === "INT")
           { 
                 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.data );
                 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( itemList ), gl.STATIC_DRAW);
                 this.itemType = gl.UNSIGNED_SHORT;
           }
           else
              { 
                 this.itemType = "UNKNOWN";
                 throw ("Unrecognized buffer format " + item_Type);
              }
    }   
    
    
    Buffer.prototype.bind = function( gl, target ) 
    {
        gl.bindBuffer( gl.ARRAY_BUFFER, this.data );
        gl.vertexAttribPointer( target, this.data.itemSize, this.itemType, false, 0, 0);   
    }
    
        
        
    function Mesh( gl, vertice_List, indice_List, uv_List )
    {	
        this.vertices   = new Buffer( gl, "FLOAT", vertice_List,  3  );
        this.texCoords  = new Buffer( gl, "FLOAT", uv_List     ,  2  );
        this.indices    = new Buffer( gl, "INT"  , indice_List ,  1  );
    }

  
  
    function Entity( mesh , material )
    {
        this.mesh         = mesh;
        this.material     = material;              
        this.position     = [0,0,-15];
        this.scales       = [1,1,1];
        this.orientation  = mat4.create();
        mat4.identity(  this.orientation );
     }
    
    
    Entity.prototype.get_WorldTransformation = function()
    { 
        var world = mat4.create();      
                    mat4.identity(  world                         );
                    mat4.translate( world, this.position,  world  );   // Temporary HAX for the camera
                    mat4.scale    ( world, this.scales,    world  );
                    mat4.multiply(  world,this.orientation, world );
                                     
    return  world;
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
      //  this.position += displacement;
    }
		
    Entity.prototype.pitch = function( radians ) 
    {
        mat4.rotate( this.orientation, radians, [1,0,0], 0 );
    }	
	
    Entity.prototype.yaw = function( radians ) 
    {
        mat4.rotate( this.orientation, radians, [0,1,0], 0 );
    }
	
    Entity.prototype.roll = function( radians ) 
    {
        mat4.rotate( this.orientation, radians, [0,0,1], 0 );
    }
		
    Entity.prototype.scale = function( axes ) 
    {
	this.scales[0] = axes[0];
        this.scales[1] = axes[1];
        this.scales[2] = axes[2];
        
    }