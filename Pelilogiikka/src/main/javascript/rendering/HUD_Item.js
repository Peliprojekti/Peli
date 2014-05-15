


function HUD_Item( gl, material, dimensions )
{
    this.width  = dimensions[0];
    this.height = dimensions[1];
  
    
    var vertices      = [ -this.width,  this.height, 0,   // Top left
                           this.width,  this.height, 0,   // Top Right
                           this.width, -this.height, 0,   // Bottom Right
                          -this.width, -this.height, 0 ]; // Bottom left
       
    var indices       = [ 0, 1, 2, 2, 3, 0 ];
                  
    var texCoords     = [ 0.0, 0.0, 
                          1.0, 0.0, 
                          1.0, 1.0, 
                          0.0, 1.0 ];   
                 
     this.mesh     = new Mesh  ( gl, vertices, indices, texCoords );     
     this.material = material;
};





HUD_Item.prototype.draw = function( gl )
{
/*
    this.mesh.vertices.bind ( gl, this.material.shader.shaderProgram.vertexPositionAttribute );    
    this.mesh.texCoords.bind( gl, this.material.shader.shaderProgram.textureCoordAttribute   );
    
    this.material.bind( gl, gl.TEXTURE0                                                      );
      
    var id;
        mat4.create( id );
        mat4.identity( id );
      
    gl.uniformMatrix4fv( shaderProgram.pMatrixUniform , false,  id  );     
    gl.uniformMatrix4fv( shaderProgram.mvMatrixUniform, false,  id  );
        
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.indices.data );    
    gl.drawElements(gl.TRIANGLES, this.mesh.indices.data.numItems, gl.UNSIGNED_SHORT, 0);
*/

      var shaderProgram = this.material.shader.shaderProgram;
      var id;
        mat4.create( id );
        mat4.identity( id );

     
        this.material.bind( this.gl, this.gl.TEXTURE0 );
      
        this.gl.uniformMatrix4fv( shaderProgram.pMatrixUniform , false,  id);
        this.gl.uniformMatrix4fv( shaderProgram.mvMatrixUniform, false,  id);
      
        
        this.mesh.vertices.bind ( this.gl, this.material.shader.shaderProgram.vertexPositionAttribute );    
        this.mesh.texCoords.bind( this.gl, this.material.shader.shaderProgram.textureCoordAttribute   );
                                                  
        
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.mesh.indices.data );    
        this.gl.drawElements(this.gl.TRIANGLES, this.mesh.indices.data.numItems, this.gl.UNSIGNED_SHORT, 0);

};


