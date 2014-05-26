

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
    

    this.vertices   = new Buffer( renderer.gl, "FLOAT" , vertices ,  3  );
    this.indices    = new Buffer( renderer.gl,  "INT"  , indices  ,  1  );
        
    
  //  this.material   = new Material( )

}