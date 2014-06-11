

    function SimpleShader()
    {
        var gl           = the_Renderer.gl;
     
        this.program     = shader_Loader( "SimpleShader" );
    
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
    
    

    SimpleShader.prototype.enable = function()
    {
        the_Renderer.gl.useProgram( this.program );
    }
