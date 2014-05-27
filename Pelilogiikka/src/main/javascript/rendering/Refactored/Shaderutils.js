 function getShaderBy_ID(gl, id ) 
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
        
        if ( shaderScript.type == "PIXEL_SHADER")    shader = gl.createShader(gl.FRAGMENT_SHADER);
        else 
            if ( shaderScript.type == "VERTEX_SHADER")  shader = gl.createShader(gl.VERTEX_SHADER);
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


function build_Shader( gl , label_VS , label_PS )
{
    try
    {
        var pixelShader     = getShaderBy_ID( gl, label_PS  );	
        var vertexShader    = getShaderBy_ID( gl, label_VS  );
        var shaderProgram   = gl.createProgram();
	
        gl.attachShader( shaderProgram, vertexShader );
        gl.attachShader( shaderProgram, pixelShader  );	
        gl.linkProgram ( shaderProgram               );

        if( !gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS) ) 
        {
            alert("Could not load shader! ");
        }
   
    }
    catch( exception )
    {
        alert("Something went exceptionally bad with shader loading: " + exception.toString() );
    }
    
    
return shaderProgram;
}