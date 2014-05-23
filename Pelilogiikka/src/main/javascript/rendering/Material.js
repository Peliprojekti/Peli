 
    function Material( shader, texture, texture2, texture3, texture4, flags )
    {
        this.shader       = shader;
        this.texture      = texture;
        this.texture2     = texture2;
        this.texture3     = texture3;
        this.texture4     = texture4;
        this.textureFlags = flags;
        
    }
    
    
    Material.prototype.bind = function( gl, slot, lights ) 
    {
        this.shader.bind( gl , this.texture, this.texture2, this.texture3, this.texture4 );
       
        
        gl.uniform1i(this.shader.shaderProgram.samplerUniform, 0); 
    }