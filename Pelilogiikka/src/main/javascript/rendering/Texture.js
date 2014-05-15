
    
    function onLoad( gl, texture )
    {
        gl.bindTexture(gl.TEXTURE_2D, texture); 
      
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.TRILINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.ANISOTROPIC_MIPMAP);
      
        gl.generateMipmap(gl.TEXTURE_2D);
        
        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    function Texture( gl, fileName )
    {         
        var myTexture   = gl.createTexture();
        myTexture.image = new Image();
        myTexture.image.onload = function () 
        {
           onLoad( gl, myTexture )
        }

     myTexture.image.src = fileName;       
     this.data           = myTexture;
    }
    
    
    
     
