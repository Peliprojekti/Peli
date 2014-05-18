

 function getShader(gl, id) 
 {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
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


      


    function Shader( gl_Context, vs_Program, ps_Program )
    {
	var fragmentShader  = getShader( gl_Context, ps_Program);	
	var vertexShader    = getShader( gl_Context, vs_Program);
		
        this.shaderProgram = gl_Context.createProgram();
	
	gl_Context.attachShader( this.shaderProgram, vertexShader      );
	gl_Context.attachShader( this.shaderProgram, fragmentShader    );	
	gl_Context.linkProgram ( this.shaderProgram			);

	if (!gl_Context.getProgramParameter(this.shaderProgram, gl_Context.LINK_STATUS)) 
	{
            alert("Could not load shader!");
	}
		
	this.bind( gl_Context );
    }



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