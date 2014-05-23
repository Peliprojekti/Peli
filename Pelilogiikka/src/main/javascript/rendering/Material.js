 
    function Material( shader, texture, texture2, texture3, texture4, flags )
    {
        this.shader       = shader;
        this.texture      = texture;
        this.texture2     = texture2;
        this.texture3     = texture3;
        this.texture4     = texture4;
        this.textureFlags = flags;
        
    }
    
    
    Material.prototype.bind = function( gl, slot ) 
    {
        this.shader.bind( gl );
        
        gl.activeTexture(slot);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.data);
        gl.uniform1i(this.shader.shaderProgram.samplerUniform, 0); 
    }