


function Guiobject( renderer, assman, texRef, shaderRef, dimensions, tint  )
{
    var crosshair       = assman.get( texRef, function( renderer, path )
                        {
                            return new  Texture( renderer.gl ,  path, "FILTER_PLAIN"  );           
                        });
                        
    var shader          = new  Shader  ( renderer.gl , shaderRef[0]  , shaderRef[1]  );
    var material        = new  Material(    shader   , crosshair                     );
    
    this.coloring       = tint;
    this.width          = dimensions.x;
    this.height         = dimensions.y;
    
    var vertices        = [ -this.width,  this.height, 0,   // Top left
                             this.width,  this.height, 0,   // Top Right
                             this.width, -this.height, 0,   // Bottom Right
                            -this.width, -this.height, 0 ]; // Bottom left
       
    var indices         = [ 0, 1, 2, 
                            2, 3, 0          ];
    
    var texCoords       = [ 0.0, 0.0, 
                            1.0, 0.0, 
                            1.0, 1.0, 
                            0.0, 1.0         ];   
                 
    var mesh            = new Mesh  ( renderer.gl, vertices, indices, texCoords );     
    this.entity         = new Entity( mesh, material                            );
};



Guiobject.prototype.prepare = function( gl)
{
    this.material.shader.shaderProgram.vColor = gl.getUniformLocation(this.material.shader.shaderProgram, "vColor");

    gl.uniform4f( this.material.shader.shaderProgram.vColor, 1.0,1.0,1.0,1.0 );
    
    alert( "rendared " );
}