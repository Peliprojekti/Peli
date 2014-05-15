 
    function Material( shader, texture )
    {
        this.shader  = shader;
        this.texture = texture;
    }
    
    
    Material.prototype.bind = function( gl, slot ) 
    {
        gl.activeTexture(slot);
        gl.bindTexture(gl.TEXTURE_2D, this.texture.data);
        gl.uniform1i(this.shader.shaderProgram.samplerUniform, 0); 
    }