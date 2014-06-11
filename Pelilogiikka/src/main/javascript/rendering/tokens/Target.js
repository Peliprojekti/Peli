

    function TargetX( batchlist, begin_Transformation, end_Transformation )        
    {
        this.batches              = batchlist;
        this.begin_Transformation = begin_Transformation;
        this.end_Transformation   = end_Transformation;
        
        alert("Batches loaded " + this.batches.length );
    }


    TargetX.prototype.render = function()
    {
        the_Renderer.set_Matrices( this.begin_Transformation, null, null );
       
        for( var i = 0; i < this.batches.length; i++ )
        {
            the_Renderer.draw_Batch( this.batches[i] );
        }
    }
