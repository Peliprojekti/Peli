	

        
    function Guithing( renderer , material, dimensions )
    {	
        /*
         this.width     = dimensions[0];
         this.height    = dimensions[1];
    
         var vertices   = [ -this.width,  this.height, -10,    // Top left
                             this.width,  this.height, -10,    // Top Right
                             this.width, -this.height, -10,    // Bottom Right
                            -this.width, -this.height, -10  ]; // Bottom left
       
         var indices    = [ 0, 1, 2, 
                            2, 3, 0  ];
         
         var texCoords  = [ 0.0, 0.0, 
                            1.0, 0.0, 
                            1.0, 1.0, 
                            0.0, 1.0 ];   
                      
        this.material   = material;
        

     
        this.vertices   = new Buffer( renderer.gl, "FLOAT", vertices  ,  3  );
        this.indices    = new Buffer( renderer.gl, "INT"  , indices   ,  1  );
        this.texCoords  = new Buffer( renderer.gl, "FLOAT", texCoords ,  2  );
    */
    }


    Guithing.prototype.render = function( gl  )
    {
        /*
        this.vertices.bind ( gl, this.material.shader.shaderProgram.vertexPositionAttribute  );    
        this.texCoords.bind( gl, this.material.shader.shaderProgram.textureCoordAttribute    );
       
        gl.bindBuffer  (gl.ELEMENT_ARRAY_BUFFER, this.indices.data                      );    
        gl.drawElements(gl.TRIANGLES, this.indices.data.numItems, gl.UNSIGNED_SHORT, 0  );
        */
    }
     


