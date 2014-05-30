	

        
    function GuiItem( renderer , material, dimensions )
    {	
         this.width     = dimensions[0];
         this.height    = dimensions[1];
    
         var vertices   = [ -this.width,  this.height, 0,   // Top left
                             this.width,  this.height, 0,   // Top Right
                             this.width, -this.height, 0,   // Bottom Right
                            -this.width, -this.height, 0 ]; // Bottom left
       
         var indices    = [ 0, 1, 2, 2, 3, 0 ];
                  
         var texCoords  = [ 0.0, 0.0, 
                            1.0, 0.0, 
                            1.0, 1.0, 
                            0.0, 1.0 ];   
                      
                 
        this.material   = material;
        
        this.vertices   = new Buffer( renderer.gl, "FLOAT", vertices  ,  3  );
        this.indices    = new Buffer( renderer.gl, "INT"  , indices   ,  1  );
        this.texCoords  = new Buffer( renderer.gl, "FLOAT", texCoords ,  2  );
    }


     GuiItem.prototype.render = function( gl, material  )
     {
      
         /*
        this.vertices.bind ( gl, material.shader.shaderProgram.vertexPositionAttribute  );    
        this.texCoords.bind( gl, material.shader.shaderProgram.textureCoordAttribute    );
        this.normals.bind  ( gl, material.shader.shaderProgram.vertexNormalAttribute    );
         
    if (typeof binormals  != 'undefined')
         this.binormals.bind( gl, material.shader.shaderProgram.vertexBinormalAttribute );
   
    if (typeof this.tangents  != 'undefined')
       this.tangents.bind ( gl, material.shader.shaderProgram.vertexTangentAttribute  );
    
    //#!#
    if (typeof this.binormals  != 'undefined')
       this.binormals.bind ( gl, material.shader.shaderProgram.vertexBinormalAttribute  );
    
         
        gl.bindBuffer  (gl.ELEMENT_ARRAY_BUFFER, this.indices.data                      );    
        gl.drawElements(gl.TRIANGLES, this.indices.data.numItems, gl.UNSIGNED_SHORT, 0  );
     */
    }
     
     



