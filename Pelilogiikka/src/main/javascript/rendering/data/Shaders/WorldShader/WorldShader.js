
// Put this global ELSEWHERE PLZ

    function build_ShaderProgram ( vs_Text, ps_Text )
    {
        var gl              = the_Renderer.gl;
        var fragmentShader  = this.getShader( gl, ps_Text, "PIXEL_SHADER");
        var vertexShader    = this.getShader( gl, vs_Text, "VERTEX_SHADER");
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
        var path_Vertex  = new Parser("data/Shaders/WorldShader/VertexShader.txt"); 
        var path_Pixel   = new Parser("data/Shaders/WorldShader/PixelShader.txt" ); 
        this.program     = build_ShaderProgram( path_Vertex, path_Pixel );
    
        gl.useProgram( this.program );       
        
    // Declare and enable vertex attributes to be used here
        this.program.vertexPosition    = gl.getAttribLocation( program , "vertexPosition" );
        this.program.vertexTexCoord    = gl.getAttribLocation( program , "vertexTexcoord"  );
        this.program.vertexNormal      = gl.getAttribLocation( program , "vertexNormal"   );
        this.program.vertexBinormal    = gl.getAttribLocation( program , "vertexBinormal" );
        this.program.vertexTangent     = gl.getAttribLocation( program , "vertexTangent"  );
     
        gl.enableVertexAttribArray(this.program.vertexPosition );
        gl.enableVertexAttribArray(this.program.vertexTexCoord );
        gl.enableVertexAttribArray(this.program.vertexNormal   ); 
        gl.enableVertexAttribArray(this.program.vertexBinormal );  
        gl.enableVertexAttribArray(this.program.vertexTangent  );     
    
    // Declare uniform attributes here
        
        // One sampler for each map used
        this.program.textureMapSampler         = gl.getUniformLocation( this.program, "textureMapSampler" );
        this.program.normalMapSampler          = gl.getUniformLocation( this.program, "textureMapSampler" );
        
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
        
        texturList[0].bind();
        
//gl.activeTexture(gl.TEXTURE0);
       // gl.bindTexture(gl.TEXTURE_2D, tex1.data );
       // gl.uniform1i( gl.getUniformLocation( shaderProgram, "texSampler"), 0);
        
        
        /*
         * 
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex1.data );
        gl.uniform1i( gl.getUniformLocation( shaderProgram, "texSampler"), 0);
        
        if( shaderFeatures.normal_Map == true )
        {     
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, tex2.data );
            gl.uniform1i( gl.getUniformLocation( shaderProgram, "normalSampler"), 1);
         
            if( shaderFeatures.parallax_Map == true )
            {
                gl.activeTexture(gl.TEXTURE2);
                gl.bindTexture(gl.TEXTURE_2D, tex3.data );
                gl.uniform1i( gl.getUniformLocation( shaderProgram, "dispSampler"), 2);
            }
        }
       
        if( lights.length != 0 )  // Setup lights here.
        {
            var posArray = [];
            var colArray = [];
            
            for( var i = 0; i < lights.length; i++ )   //"-64.297035 , -34.088657 , -117.10157"
            {
                var pos = lights[i].orientation.get_Position();
                posArray.push( pos.x );
                posArray.push( pos.y );
                posArray.push( pos.z );
                
                var col = lights[i].colors[1];  
                colArray.push( 1.0 );
                colArray.push( 1.0 );
                colArray.push( 1.0 );
            }
            
        shaderProgram.lights        = gl.getUniformLocation(shaderProgram , "lights"                );  
                                      gl.uniform3fv( shaderProgram.lightsUniform   , posArray       );
        
        shaderProgram.lightCnt      = gl.getUniformLocation(shaderProgram, "lightCnt"               );
                                      gl.uniform1i( shaderProgram.lightCntUniform , lights.length   );    
                                           
        shaderProgram.lColors       = gl.getUniformLocation(shaderProgram, "lColors"                );
                                      gl.uniform3fv( shaderProgram.lColorsUniform , colArray        );    
        }
       
        var eyePos = camera.get_Position();
        shaderProgram.eyePositionUniform  = gl.getUniformLocation(shaderProgram, "eyePosition"    );
                                            gl.uniform1i( shaderProgram.eyePositionUniform , [eyePos.x,eyePos.y,eyePos.z]    );  
         */
        
        
    }




/*
var WorldShader = 
{
         
    initializer :  function( gl , shaderProgram )
    {
    /*
        shaderProgram.vertexPositionAttribute   = gl.getAttribLocation( shaderProgram, "vertexPos"      );
        shaderProgram.vertexNormalAttribute     = gl.getAttribLocation( shaderProgram, "vertexNormal"   );
        shaderProgram.vertexBinormalAttribute   = gl.getAttribLocation( shaderProgram, "vertexBinormal" );
        shaderProgram.vertexTangentAttribute    = gl.getAttribLocation( shaderProgram, "vertexTangent"  );
        shaderProgram.textureCoordAttribute     = gl.getAttribLocation( shaderProgram, "vertexUV"       );
                                                  
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute); 
        gl.enableVertexAttribArray(shaderProgram.vertexBinormalAttribute);  
        gl.enableVertexAttribArray(shaderProgram.vertexTangentAttribute);     
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
        
        shaderProgram.samplerUniform            = gl.getUniformLocation( shaderProgram, "texSampler"     );
        shaderProgram.pMatrixUniform            = gl.getUniformLocation( shaderProgram, "projMatrix"     );
        shaderProgram.mvMatrixUniform           = gl.getUniformLocation( shaderProgram, "worldViewMatrix");
        shaderProgram.mMatrixUniform            = gl.getUniformLocation( shaderProgram, "worldMatrix"    );
        shaderProgram.lightsUniform             = gl.getUniformLocation( shaderProgram, "lights"         ); 
        shaderProgram.lightCntUniform           = gl.getUniformLocation( shaderProgram, "lightCnt"       ); 
        shaderProgram.lColorsUniform            = gl.getUniformLocation( shaderProgram, "lColors"        );
        shaderProgram.eyePositionUniform        = gl.getUniformLocation( shaderProgram, "eyePosition"    ); 
   
    },


    binder :  function( )
    {
    /*    gl.uniform4f( shaderProgram.vColor, 1.0,1.0,1.0,1.0 ); // Upload various values to the shader
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex1.data );
        gl.uniform1i( gl.getUniformLocation( shaderProgram, "texSampler"), 0);
        
        if( shaderFeatures.normal_Map == true )
        {     
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, tex2.data );
            gl.uniform1i( gl.getUniformLocation( shaderProgram, "normalSampler"), 1);
         
            if( shaderFeatures.parallax_Map == true )
            {
                gl.activeTexture(gl.TEXTURE2);
                gl.bindTexture(gl.TEXTURE_2D, tex3.data );
                gl.uniform1i( gl.getUniformLocation( shaderProgram, "dispSampler"), 2);
            }
        }
       
        if( lights.length != 0 )  // Setup lights here.
        {
            var posArray = [];
            var colArray = [];
            
            for( var i = 0; i < lights.length; i++ )   //"-64.297035 , -34.088657 , -117.10157"
            {
                var pos = lights[i].orientation.get_Position();
                posArray.push( pos.x );
                posArray.push( pos.y );
                posArray.push( pos.z );
                
                var col = lights[i].colors[1];  
                colArray.push( 1.0 );
                colArray.push( 1.0 );
                colArray.push( 1.0 );
            }
            
        shaderProgram.lights        = gl.getUniformLocation(shaderProgram , "lights"                );  
                                      gl.uniform3fv( shaderProgram.lightsUniform   , posArray       );
        
        shaderProgram.lightCnt      = gl.getUniformLocation(shaderProgram, "lightCnt"               );
                                      gl.uniform1i( shaderProgram.lightCntUniform , lights.length   );    
                                           
        shaderProgram.lColors       = gl.getUniformLocation(shaderProgram, "lColors"                );
                                      gl.uniform3fv( shaderProgram.lColorsUniform , colArray        );    
        }
       
        var eyePos = camera.get_Position();
        shaderProgram.eyePositionUniform  = gl.getUniformLocation(shaderProgram, "eyePosition"    );
                                            gl.uniform1i( shaderProgram.eyePositionUniform , [eyePos.x,eyePos.y,eyePos.z]    );   
    
    },


    load : function( ) 
    {   
        var gl           = the_Renderer.gl;
        var path         = "data/Shaders/Shader1/";
        var path_Vertex  = new Parser(path+"/VertexShader.txt"); 
        var path_Pixel   = new Parser(path+"/PixelShader.txt" ); 
   
   
   // return new Shader( gl, p1.the_Document.rawData, p2.the_Document.rawData, features, new ShaderTemplate( Shader1.initializer, Shader1.binder ) );
    }

    
};
*/