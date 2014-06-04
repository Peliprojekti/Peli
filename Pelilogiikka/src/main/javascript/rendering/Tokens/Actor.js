    
    
    
    
    function Actor( screenPos3, dimension, texture )
    {
        var width        = dimension.width;
        var height       = ( dimension.height * the_Renderer.aspectRatio ); 
        this.batch       = testRect( texture, width, height  );
        this.dimension   = dimension; 
        
        this.orientation = new Matrix33();  // Orthonormal basis
        this.translation = new Matrix44();  // 4x4 Identity matrix embedded with translation
        this.translation.embed_Translation( screenPos3 );
    }

    Actor.get_Transformation = function()
    {
        var ret = new Matrix44();
            ret.embed( this.orientation );    

    return ret.multiply( this.translation );
    }




