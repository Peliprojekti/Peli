



    function GuiItem( screenPos2, dimension, texture )
    {
        var width        = dimension.width;
        var height       = ( dimension.height * the_Renderer.aspectRatio ); 
        this.batch       = testRect( texture, width, height  );
        
        this.dimension   = dimension; 
        this.translation = new Matrix44();
        this.translation.embed_Translation( new Vector3(screenPos2.x, screenPos2.y, 0.0) );
    }


    GuiItem.get_Transformation = function()
    {
        return this.translation;
    }



