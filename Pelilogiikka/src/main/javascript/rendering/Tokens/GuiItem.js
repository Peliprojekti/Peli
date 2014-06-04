



    function GuiItem( screenPos2, dimension, texture )
    {
        var width        = dimension.width;
        var height       = ( dimension.height * the_Renderer.aspectRatio ); 
        this.batch       = testRect( texture, width, height  );
        
        this.dimension   = dimension; 
        this.translation = new Matrix44();
        this.translation.embed_Translation( new Vector3(screenPos2.x, screenPos2.y, 0.0) );
    }


    GuiItem.prototype.get_Transformation = function()
    {
        return this.translation;
    }



    GuiItem.prototype.move = function( vec2 )
    {
        var v3 =this.translation.get_Translation();
            v3.x += vec2.x;
            v3.y += vec2.y;
            
    this.translation.embed_Translation( v3 );
    }
    

