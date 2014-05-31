
    // Too small to bother with initialization flags
    function Matrix22()
    {
        this.m11 = 1; this.m12 = 0;
        this.m21 = 0; this.m22 = 1;     
    }
    
    Matrix22.prototype.rotation = function( rads )
    {
        this.m11 =  Math.cos( rads ); this.m12 = Math.sin( rads );
        this.m21 = -Math.sin( rads ); this.m22 = Math.cos( rads );
    }
    
    Matrix22.prototype.transform = function( vec2 ) 
    {
        return new Vector2( vec2.x * this.m11 + vec2.x * this.m12,
                            vec2.y * this.m21 + vec2.y * this.m22 );
    }

    Matrix22.prototype.transposed = function()
    {
        return new Matrix22( this.m11 , this.m21,
                             this.m12 , this.m22 );
    }