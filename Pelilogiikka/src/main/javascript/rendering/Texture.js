
    
    function onLoad( gl, texture, flags )
    {
        gl.bindTexture(gl.TEXTURE_2D, texture); 
      
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        
        
        if( flags === "FILTER_PLAIN")
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST            );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST            );
        }
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.TRINILEAR          );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.ANISOTROPIC_MIPMAP );
            gl.generateMipmap(gl.TEXTURE_2D);
        }
        
    gl.bindTexture(gl.TEXTURE_2D, null);
    }

    function Texture( gl, fileName, flags )
    {         
        var myTexture   = gl.createTexture();
        myTexture.image = new Image();
        myTexture.image.onload = function () 
        {
           onLoad( gl, myTexture, flags );
        };

     myTexture.image.src = fileName;       
     this.data           = myTexture;
    }
    
    
    
     
