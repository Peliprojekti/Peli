        
    function Buffer( gl, token ) 
    {  
       if( !VALID(token) ) throw new Exception( "NULL", "Undefined Meshbuffer attribute!" );
        
       this.gl    = gl;
       this.data  = gl.createBuffer();		
       this.label = token.label;
       
       if( !this.data )    throw new Exception( "FATAL", "WebGL failed to allocate a buffer" );
        
       switch( token.type )
       {
           
           case "VEC3": 
                            this.item_Size  = 3;
                            this.item_Type  = gl.FLOAT;
                            
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( token.data ), gl.STATIC_DRAW);   
           break;
           
           case "VEC2": 
                            this.item_Size  = 2;
                            this.item_Type  = gl.FLOAT;
                            
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( token.data ), gl.STATIC_DRAW);
           break;
           
           case "INT" : 
                            this.item_Size  = 1;
                            this.itemType   = gl.UNSIGNED_SHORT;
                            
                            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.data );
                            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( token.data ), gl.STATIC_DRAW);
                            
           break;
           
           case "FLOAT": 
                            this.item_Type = gl.FLOAT;
           break;

       default: throw new Exception( "UNSUPPORTED", "Vertex buffer encountered an unsupported attribute type: " + token.type );
       }
        
    this.data.itemCount = token.data.length / this.data.itemSize;     
    }   
    
    
    Buffer.prototype.bind = function( target ) 
    {
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.data );
        this.gl.vertexAttribPointer( target, this.item_Size, this.item_Type, false, 0, 0);   
    }








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
 
        // This... "THING" refuses to work properly with forEach idiom. GOD I HATE THIS TYPELESS BULLSHIT
        for( var i = 0; i < vertex_Attributes.length; i++ )     
        {
            var token     = vertex_Attributes[i];
            var attribute = new Reference( token.type , token.label );
            
            try
            {
                attribute.reference = new Buffer( renderer.gl, token );
            }  
            catch( exception )
            {
                // What to do here... Stuff is already kinda ruined if this block is reached... :/
                // Bad type? Not labeled? Empty?
                
            throw new Exception( "FATAL" , "Unimplemented exception handler at Mesh constructor - Default policy is to pass exceptions.");
            }
        
        this.attribute_Buffers.push(  attribute );
        }
        
    }


    Mesh.prototype.bind = function()
    {
        this.attribute_Buffers.forEach( function( attribute )
        {
            attribute.bind();
        });
    }


    Mesh.prototype.report = function()
    {
        console.info( "- Begin Mesh Report -" );
        console.info( this.attribute_Buffers.length + " vertex attributes: ");
    
        this.attribute_Buffers.forEach( function( buffer )
        {
            console.info( buffer.label );
        });
        
    console.info( "- End Report -" );
    }
