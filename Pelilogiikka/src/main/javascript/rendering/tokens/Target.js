

function Target( batchlist, begin_Transformation, end_Transformation )        
{
    this.batches              = batchlist;
    this.transformation       = begin_Transformation;
    this.begin_Transformation = begin_Transformation;
    this.end_Transformation   = end_Transformation;
}



Target.prototype.whatTheFuck = function()
{
    alert("OK");
    
}

Target.prototype.render = function()
{
 
    /*
    for( var i = 0; i < this.batches.length; i++ )
    {
        the_Renderer.set_Matrices( this.transformation, null, null );
        the_Renderer.draw_Batch( this.batches[i] );
    }
    */
}