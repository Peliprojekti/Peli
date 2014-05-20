


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