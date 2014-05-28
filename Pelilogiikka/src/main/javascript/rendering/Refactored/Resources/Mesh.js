
function VertexAttribute( type, label, data )
{
    if( !VALID( type        ) ) throw new Exception("NULL", "Vertex attribute initialized with an undefined type");
    else
        this.type  = type;
    
    if( !VALID( label       ) ) throw new Exception("NULL", "Vertex attribute initialized with an undefined type");
    else
        this.label = label;

    if( !VALID( data        ) ) throw new Exception("NULL", "Vertex data initialized with an undefined type");
   
    if( !VALID( data.length ) ) throw new Exception("NULL", "Vertex attribute data is not an array!");
    
this.data = data;
}





function Mesh( renderer, vertex_Attributes ) 
{
    this.attribute_Buffers = [];
   
    this.attribute_Buffers.push( vertex_Attributes.forEach( function( token )
    {
        var attribute = new Reference( token.type , token.label );
        
        try
        {
            attribute.reference = new Buffer( renderer.gl, token );
        }
        catch( exception )
        {
            // What to do here... Stuff is already kinda ruined if this block is reached... :/
            // Bad type?
            // Not labeled?
            // Empty?
        }
   
    return attribute;
    }));
  
}


Mesh.prototype.bind = function()
{
    this.attribute_Buffers.forEach( function( attribute )
    {
        attribute.bind();
    });
}
