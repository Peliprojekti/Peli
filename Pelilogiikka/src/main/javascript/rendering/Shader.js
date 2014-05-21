
// Reminder to self:
/*
Uniforms are sent to both vertex shaders and fragment shaders and contain values that stay the same across the entire frame being rendered.

Attributes are values that are applied to individual vertices. Attributes are only available to the vertex shader. 1:1 mapping to vertice list

Varyings are variables declared in the vertex shader that we want to share with the fragment shader. 
To do this we make sure we declare a varying variable of the same type and name in both the vertex shader and the fragment shader.
*/




 Shader.prototype.getShader = function (gl, id) 
 {
        var shaderScript = document.getElementById(id);
       
        if (!shaderScript) 
        {
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
        
        if ( shaderScript.type == "x-shader/x-fragment") 
        {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } 
        else 
            if ( shaderScript.type == "x-shader/x-vertex") 
            {
                shader = gl.createShader(gl.VERTEX_SHADER);
            } 
            else 
                {
                    return null;
                }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

    return shader;
    }


      


    function Shader( gl, vs_Program, ps_Program )
    {
	var fragmentShader  = this.getShader( gl, ps_Program);	
	var vertexShader    = this.getShader( gl, vs_Program);
        this.shaderProgram  = gl.createProgram();
	
	gl.attachShader( this.shaderProgram, vertexShader      );
	gl.attachShader( this.shaderProgram, fragmentShader    );	
	gl.linkProgram ( this.shaderProgram                    );

	if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) 
	{
            alert("Could not load shader!");
	}
        
        
        //gl.useProgram( this.shaderProgram );

	this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation( this.shaderProgram, "vertexPos");
                                                     gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);


        this.shaderProgram.vertexNormalAttribute   = gl.getAttribLocation( this.shaderProgram, "vertexNormal");
                                                     gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);                                                
                                                     

	this.shaderProgram.textureCoordAttribute   = gl.getAttribLocation(this.shaderProgram,  "vertexUV");
                                                     gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
	
        this.shaderProgram.samplerUniform          = gl.getUniformLocation(this.shaderProgram, "textureSampler");
        
        
        
	this.shaderProgram.pMatrixUniform          = gl.getUniformLocation(this.shaderProgram, "projMatrix"     );
	this.shaderProgram.mvMatrixUniform         = gl.getUniformLocation(this.shaderProgram, "worldViewMatrix");
        this.shaderProgram.mMatrixUniform          = gl.getUniformLocation(this.shaderProgram, "worldMatrix"    );
        

        
        this.shaderProgram.vColor                  = gl.getUniformLocation(this.shaderProgram, "vColor");
        
    //	this.bind( gl );
    }
    
   
    
    
    
    
    
    
    


    Shader.prototype.bind = function( gl )
    {
        
        gl.uniform4f( this.shaderProgram.vColor, 1.0,1.0,1.0,1.0 ); // Upload various values to the shader
       
    gl.useProgram( this.shaderProgram );        // Make the shader active.
    }
    
    
    
    
    
    
    
    //Reference
    /*
    Shader.prototype.bind = function( gl )
    {
        gl.useProgram( this.shaderProgram );

	this.shaderProgram.vertexPositionAttribute = gl.getAttribLocation( this.shaderProgram, "aVertexPosition");
                                                     gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

	this.shaderProgram.textureCoordAttribute   = gl.getAttribLocation(this.shaderProgram, "aTextureCoord");
                                                     gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
	
        
	this.shaderProgram.pMatrixUniform          = gl.getUniformLocation(this.shaderProgram, "uPMatrix" );
	this.shaderProgram.mvMatrixUniform         = gl.getUniformLocation(this.shaderProgram, "uMVMatrix");
	this.shaderProgram.samplerUniform          = gl.getUniformLocation(this.shaderProgram, "uSampler");
    }
    */