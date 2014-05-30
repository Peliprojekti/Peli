

    function ShaderFeatures( mappings )    
    {
        if( mappings[0] == "NORMAL") this.normal_Map = true;
        else
            this.normal_Map   = false;
        
        if( mappings[1] == "PARALLAX") this.parallax_Map = true;
        else
            this.parallax_Map   = false;
    }



 Shader.prototype.getShader = function (gl, id ) 
 {
     
        var shaderScript = document.getElementById(id);
       
        if (!shaderScript) 
        {
            alert(" NULL script shader! - ABORT - ");
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) 
        {
            if (k.nodeType == 3) 
            {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        
        if ( shaderScript.type == "x-shader/x-fragment")     shader = gl.createShader(gl.FRAGMENT_SHADER);
        else 
            if ( shaderScript.type == "x-shader/x-vertex")   shader = gl.createShader(gl.VERTEX_SHADER);
            else 
                 return null;
               
        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert( gl.getShaderInfoLog(shader) );
            return null;
        }

    return shader;
    }
    
    
    
    Shader.prototype.getShader2 = function( gl, shaderText, type ) 
    {  
        if (!shaderText) 
        {
            alert(" NULL script shader! - ABORT - ");
            return null;
        }

        var shader = null;
        
        if( type == "VERTEX_SHADER" ) gl.createShader(gl.VERTEX_SHADER);
        else
            if( type == "PIXEL_SHADER") gl.createShader( gl.FRAGMENT_SHADER );
            
        gl.shaderSource(shader, shaderText);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert( gl.getShaderInfoLog(shader) );
            return null;
        }

    return shader;
    }


    
    
    
    // This template is used to initialize and bind various numbers of shader terms.
    // Each shader program must be provided with the initializer.
    function ShaderTemplate( shader_Initializer, shader_Binder )
    {
        this.initializer = shader_Initializer;
        this.binder      = shader_Binder;
        
    }
    
   





   

    function Shader( gl, vs_Program, ps_Program, features, template )
    {
        this.features       = features;
        
       
	var fragmentShader  = this.getShader( gl, ps_Program      );	
	var vertexShader    = this.getShader( gl, vs_Program      );
        
        
        this.shaderProgram  = gl.createProgram();
	
	gl.attachShader( this.shaderProgram, vertexShader         );
	gl.attachShader( this.shaderProgram, fragmentShader       );	
	gl.linkProgram ( this.shaderProgram                       );

	if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) 
	{
            alert("Could not load shader!");
	}
        
        gl.useProgram( this.shaderProgram );        // Make the shader active.

            
        this.template       = template;  // Used to initialize shader variables and bind them before usage
            
            
        this.template.initializer( gl , this.shaderProgram );    
        /* 
        this.shaderProgram.vertexPositionAttribute   = gl.getAttribLocation( this.shaderProgram, "vertexPos");
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);
        this.shaderProgram.vertexNormalAttribute     = gl.getAttribLocation( this.shaderProgram, "vertexNormal" );
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);                
        this.shaderProgram.vertexBinormalAttribute   = gl.getAttribLocation( this.shaderProgram, "vertexBinormal");
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexBinormalAttribute);                
        this.shaderProgram.vertexTangentAttribute    = gl.getAttribLocation( this.shaderProgram, "vertexTangent");
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexTangentAttribute);                
        this.shaderProgram.textureCoordAttribute     = gl.getAttribLocation(this.shaderProgram,  "vertexUV");
                                                       gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
        this.shaderProgram.samplerUniform            = gl.getUniformLocation(this.shaderProgram, "texSampler" );
        this.shaderProgram.pMatrixUniform            = gl.getUniformLocation(this.shaderProgram, "projMatrix"     );
        this.shaderProgram.mvMatrixUniform           = gl.getUniformLocation(this.shaderProgram, "worldViewMatrix");
        this.shaderProgram.mMatrixUniform            = gl.getUniformLocation(this.shaderProgram, "worldMatrix"    );
        this.shaderProgram.lightsUniform             = gl.getUniformLocation( this.shaderProgram, "lights"); 
        this.shaderProgram.lightCntUniform           = gl.getUniformLocation( this.shaderProgram, "lightCnt"); 
        this.shaderProgram.lColorsUniform            = gl.getUniformLocation(this.shaderProgram, "lColors"    );
        this.shaderProgram.eyePositionUniform        = gl.getUniformLocation( this.shaderProgram, "eyePosition"); 
        */
    }
    
   
   

    Shader.prototype.bind = function( gl , tex1, tex2, tex3, tex4, lights, camera )
    {
        
       
        /*
        gl.uniform4f( this.shaderProgram.vColor, 1.0,1.0,1.0,1.0 ); // Upload various values to the shader
        
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex1.data );
        gl.uniform1i( gl.getUniformLocation(this.shaderProgram, "texSampler"), 0);
        
         
        if( this.features.normal_Map == true )
        {  
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, tex2.data );
            gl.uniform1i( gl.getUniformLocation(this.shaderProgram, "normalSampler"), 1);
         
            if( this.features.parallax_Map == true )
            {
                  gl.activeTexture(gl.TEXTURE2);
                  gl.bindTexture(gl.TEXTURE_2D, tex3.data );
                  gl.uniform1i( gl.getUniformLocation(this.shaderProgram, "dispSampler"), 2);
            }
       
        }
       
       
        var lightCnt = lights.length;
       
        if( lightCnt != 0 )  // Setup lights here.
        {
            var posArray = [];
            var colArray = [];
            
            for( var i = 0; i < lightCnt; i++ )   //"-64.297035 , -34.088657 , -117.10157"
            {
                var pos = lights[i].orientation.get_Position();
                
                posArray.push( pos.x );
                posArray.push( pos.y );
                posArray.push( pos.z );
                
                var col = lights[i].colors[1];  // Diffuse
                
                colArray.push(  1.0 );
                colArray.push(  1.0 );
                colArray.push(  1.0 );
            }
            
            
            this.shaderProgram.lights    = gl.getUniformLocation(this.shaderProgram , "lights"    );  
                                           gl.uniform3fv( this.shaderProgram.lightsUniform   , posArray  );
        
                                           
            this.shaderProgram.lightCnt  = gl.getUniformLocation(this.shaderProgram, "lightCnt"    );
                                           gl.uniform1i( this.shaderProgram.lightCntUniform , lightCnt    );    
                                           
               
            this.shaderProgram.lColors   = gl.getUniformLocation(this.shaderProgram, "lColors"    );
                                           gl.uniform3fv( this.shaderProgram.lColorsUniform , colArray      );    
                                              
        }
       
       
        var eyePos = camera.get_Position();
        
        
        this.shaderProgram.eyePositionUniform  = gl.getUniformLocation(this.shaderProgram, "eyePosition"    );
                                                 gl.uniform1i( this.shaderProgram.eyePositionUniform , [eyePos.x,eyePos.y,eyePos.z]    );   
       
       
    */ 
    this.template.binder( gl, this.shaderProgram, this.features, tex1, tex2, tex3, tex4, lights, camera );
    gl.useProgram( this.shaderProgram );        // Make the shader active.
    }
    
    
    
    
    
    
    