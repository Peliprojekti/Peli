
    // This will deal with the routine 
    function shader_Loader( name )
    {
        var gl           = the_Renderer.gl;
        
        var parser1      = new Parser("data/Shaders/"+name+"/Vertexshader.txt"); 
        var parser2      = new Parser("data/Shaders/"+name+"/Pixelshader.txt"); 
        var text_Vertex  = parser1.the_Document.rawData;
        var text_Pixel   = parser2.the_Document.rawData;
        
    return build_ShaderProgram( text_Vertex, text_Pixel );
    }
    
    


    function SpriteShader()
    {
        var gl           = the_Renderer.gl;
        var parser1      = new Parser("data/Shaders/SpriteShader/Vertexshader.txt"); 
        var parser2      = new Parser("data/Shaders/SpriteShader/Pixelshader.txt"); 
        
        var text_Vertex  = parser1.the_Document.rawData;
        var text_Pixel   = parser2.the_Document.rawData;
    
        this.program     = build_ShaderProgram( text_Vertex, text_Pixel );
    
    
        gl.useProgram( this.program );       
        
    // Declare and enable vertex attributes to be used here
        this.program.vertexPosition    = gl.getAttribLocation( this.program , "vertexPosition" );
        this.program.vertexTexcoord    = gl.getAttribLocation( this.program , "vertexTexcoord"  );
     
        gl.enableVertexAttribArray( this.program.vertexPosition );
        gl.enableVertexAttribArray( this.program.vertexTexcoord );
    
    // Declare uniform attributes here
        
        // One sampler for each map used
        this.program.textureMapSampler         = gl.getUniformLocation( this.program, "textureMapSampler" );
    
        // Declare the standard transformation matrices
        this.program.worldMatrix               = gl.getUniformLocation( this.program, "worldMatrix"       );
        this.program.viewMatrix                = gl.getUniformLocation( this.program, "viewMatrix"        );
        this.program.projectionMatrix          = gl.getUniformLocation( this.program, "projectionMatrix"  );
   }                 
    
    

  
    SpriteShader.prototype.enable = function()
    {
        the_Renderer.gl.useProgram( this.program );
    }