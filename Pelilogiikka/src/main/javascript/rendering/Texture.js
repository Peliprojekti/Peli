
    
    function onLoad( texture  )
    {
    //    ASSERT_VALID(  texture, "No non-sources textures supported atm."  );
    //     ASSERT_TYPE(   String, texture, "Failed to initialize Texture with parametertype:" + typeof texture + ". Expected String." );
        
        var gl = the_Renderer.gl;
       
        gl.bindTexture( gl.TEXTURE_2D, texture ); 
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D (gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST   );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST   );
        
        gl.generateMipmap(gl.TEXTURE_2D);
        
        gl.bindTexture(gl.TEXTURE_2D, null);
   
    }


    function Texture( fileName  )
    {
        var gl = the_Renderer.gl;
        
        try
        {
            var myTexture          = gl.createTexture();
            myTexture.image        = new Image();
            
            myTexture.image.onload = function () 
            {
                onLoad( myTexture );
            };

            myTexture.image.src = fileName;       
            this.data           = myTexture;
        }
        catch( exception )
        {
            throw new Exception( Exception.Type.FAILURE, "Failed to load Texture: " + fileName + " Reason: " + exception.message );
        }
    }
    

    Texture.prototype.set_Filter = function( )
    {
        var gl = the_Renderer.gl;
        // Parametrise
        gl.texParameteri( gl.TEXTURE_2D , gl.TEXTURE_MAG_FILTER , gl.NEAREST   );
        gl.texParameteri( gl.TEXTURE_2D , gl.TEXTURE_MIN_FILTER , gl.NEAREST   );
    }
    
    
    
    Texture.prototype.bind = function( slot , shader )
    {
        var gl = the_Renderer.gl;
        
        switch( slot )
        {
            case 0 : gl.activeTexture( gl.TEXTURE0 );
                     gl.bindTexture  ( gl.TEXTURE_2D,  this.data );
                     gl.uniform1i    ( gl.getUniformLocation( shader.program , "textureMapSampler"), 0 );
            break;
            
            case 1 : gl.activeTexture( gl.TEXTURE1 );
                     gl.bindTexture  ( gl.TEXTURE_2D,  this.data );
                     gl.uniform1i    ( gl.getUniformLocation( shader.program , "textureMapSampler"), 1 );
            break;
            
            case 2 : gl.activeTexture( gl.TEXTURE2 );
                     gl.bindTexture  ( gl.TEXTURE_2D,  this.data );
                     gl.uniform1i    ( gl.getUniformLocation( shader.program , "textureMapSampler"), 2 );
            break;
            
        default: throw new Exception( Exception.Type.INVALID , "Bad texture index " + slot );
        }
            
    }
    
    