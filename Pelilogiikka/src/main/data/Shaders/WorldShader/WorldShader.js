
// Put this global ELSEWHERE PLZ

    function getShader( shaderText, type ) 
    {  
        var gl = the_Renderer.gl;
        
        
        if (!shaderText) 
        {
            alert(" NULL script shader! - ABORT - ");
            return null;
        }
        
        
        var shader;
        
        if( type == "VERTEX_SHADER" ) shader = gl.createShader(gl.VERTEX_SHADER);
        else
            if( type == "PIXEL_SHADER") shader = gl.createShader( gl.FRAGMENT_SHADER );
        
        
        
        
        gl.shaderSource(shader, shaderText);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert( gl.getShaderInfoLog(shader) );
            return null;
        }

    return shader;
    }




    function build_ShaderProgram ( vs_Text, ps_Text )
    {
        var gl              = the_Renderer.gl;
        
        var fragmentShader  = getShader( ps_Text, "PIXEL_SHADER");
        var vertexShader    = getShader( vs_Text, "VERTEX_SHADER");
        var shaderProgram   = gl.createProgram();
	
        gl.attachShader( shaderProgram, vertexShader         );
        gl.attachShader( shaderProgram, fragmentShader       );	
        gl.linkProgram ( shaderProgram                       );

        if (!gl.getProgramParameter( shaderProgram, gl.LINK_STATUS) ) 
        {
            throw new Exception( Exception.Type.FAILURE , "Failed to build shaderprogram. " );
        }
        
    return shaderProgram;
    }



    function WorldShader()
    {
        var gl           = the_Renderer.gl;
        
        var parser1      = new Parser("data/Shaders/WorldShader/Vertexshader.txt"); 
        var parser2      = new Parser("data/Shaders/WorldShader/Pixelshader.txt"); 
        
        var text_Vertex  = parser1.the_Document.rawData;
        var text_Pixel   = parser2.the_Document.rawData;
    
        this.program     = build_ShaderProgram( text_Vertex, text_Pixel );
    
        gl.useProgram( this.program );       
        
    // Declare and enable vertex attributes to be used here
        
        this.program.vertexPosition    = gl.getAttribLocation( this.program , "vertexPosition" );
        this.program.vertexTexCoord    = gl.getAttribLocation( this.program , "vertexTexcoord" );
        this.program.vertexNormal      = gl.getAttribLocation( this.program , "vertexNormal"   );
        this.program.vertexBinormal    = gl.getAttribLocation( this.program , "vertexBinormal" );
        this.program.vertexTangent     = gl.getAttribLocation( this.program , "vertexTangent"  );
     
        gl.enableVertexAttribArray( this.program.vertexPosition );
        gl.enableVertexAttribArray( this.program.vertexTexCoord );
        gl.enableVertexAttribArray( this.program.vertexNormal   ); 
        gl.enableVertexAttribArray( this.program.vertexBinormal );  
        gl.enableVertexAttribArray( this.program.vertexTangent  );     
    
    // Declare uniform attributes here
        
        // One sampler for each map used
        this.program.textureMapSampler         = gl.getUniformLocation( this.program, "textureMapSampler" );
        this.program.normalMapSampler          = gl.getUniformLocation( this.program,  "normalMapSampler" );
        
        // Declare the standard transformation matrices
        this.program.worldMatrix               = gl.getUniformLocation( this.program, "worldMatrix"       );
        this.program.viewMatrix                = gl.getUniformLocation( this.program, "viewMatrix"        );
        this.program.projectionMatrix          = gl.getUniformLocation( this.program, "projectionMatrix"  );

        // Declare array for lights
        this.program.lights                    = gl.getUniformLocation( this.program, "lights"            ); 
        this.program.lightColors               = gl.getUniformLocation( this.program, "lightColors"       );
        this.program.lightCnt                  = gl.getUniformLocation( this.program, "lightCnt"          );
        
        // Delare the camera world position
        this.program.eyePosition               = gl.getUniformLocation( this.program, "eyePosition"       );
    }
    
    

    WorldShader.prototype.bind = function( textureList )
    {
        var gl = the_Renderer.gl;
        
        // Select and Activate texturemap 
       textureList[0].bind( 0 );
       // gl.uniform1i( gl.getUniformLocation( this.program, "textureMapSampler"), 0);
        
    }
