

/*
function Guiobject( entity, coloring, alpha  )
{
    this.entity = entity;
    this.tint   = coloring;
    this.alpha  = alpha;
};


Guiobject.prototype.prepare = function( renderer )
{
    this.entity.material.shader.shaderProgram.vColor = renderer.gl.getUniformLocation(this.entity.material.shader.shaderProgram, "vColor");
    renderer.gl.uniform4f( this.entity.material.shader.shaderProgram.vColor, this.tint[0], this.tint[1], this.tint[2], 1.0 );
}

*/


    function Guiobject( renderer, texture, position, scale )
    {
        this.texture  = texture;
        this.position = position;
        this.scale    = scale;
    
        var width  = scale.x/2;
        var height = scale.y/2;
  
    
        var vertices      = [ -width,  height, 0,   // Top left
                               width,  height, 0,   // Top Right
                               width, -height, 0,   // Bottom Right
                              -width, -height, 0 ]; // Bottom left
       
        var indices       = [ 0, 1, 2, 2, 3, 0 ];
                  
        var texCoords     = [ 0.0, 0.0, 
                              1.0, 0.0, 
                              1.0, 1.0, 
                              0.0, 1.0 ];   

        this.vertices   = new Buffer( renderer.gl, "FLOAT" , vertices  ,  3  );
        this.indices    = new Buffer( renderer.gl,  "INT"  , indices   ,  1  );
        this.texCoords  = new Buffer( renderer.gl, "FLOAT" , texCoords ,  2  );
           
        var shader      = new Shader( renderer.gl, "HAX_VS", "COLOR_PS" );
        this.material   = new Material( texture, shader ); 
    }





    Guiobject.prototype.draw = function( gl )
    {
     
        var worldMatrix     = new Matrix44( "ID" );
            worldMatrix.m41 = this.position.x;
            worldMatrix.m42 = this.position.y;
            worldMatrix.m43 = 0.0;
              
        this.material.bind( this.gl, this.gl.TEXTURE0, [], null );    // SLOT is OBSOLETE here!
      
       this.gl.uniformMatrix4fv( this.material.shader.shaderProgram.mMatrixUniform , false,  worldMatrix                      );
     /*
     
        this.gl.uniformMatrix4fv( this.material.shader.shaderProgram.pMatrixUniform , false,  this.projection_Matrix           );
        this.gl.uniformMatrix4fv( this.material.shader.shaderProgram.mMatrixUniform , false,  worldMatrix                      );
     //   this.gl.uniformMatrix4fv( this.material.shader.shaderProgram.mvMatrixUniform, false,  worldViewMatrix                  );
        
        myEntity.mesh.render_Indexed( this.gl, myEntity.material );
   */ 
  
         this.vertices.bind ( gl, this.material.shader.shaderProgram.vertexPositionAttribute  );    
         this.texCoords.bind( gl, this.material.shader.shaderProgram.textureCoordAttribute    );
        
         gl.bindBuffer  (gl.ELEMENT_ARRAY_BUFFER, this.indices.data                      );    
         gl.drawElements(gl.TRIANGLES, this.indices.data.numItems, gl.UNSIGNED_SHORT, 0  );
  
    }