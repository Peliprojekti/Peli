function TargetX (batchlist, begin_Transformation, end_Transformation)
{
    this.batches = batchlist;
    this.begin_Transformation = begin_Transformation;
    this.end_Transformation = end_Transformation;
    this.current_Transformation = this.begin_Transformation;
    var pos1 = this.begin_Transformation.get_Translation();
    var pos2 = this.end_Transformation.get_Translation();
    this.interpolator_X = new Interpolator(pos1.x, pos2.x);
    this.interpolator_Y = new Interpolator(pos1.y, pos2.y);
    this.interpolator_Z = new Interpolator(pos1.z, pos2.z);
    this.hitShape = new Sphere3(pos1, 5);
}

TargetX.prototype.render = function ()
{
    the_Renderer.set_Matrices(this.begin_Transformation, null, null);
    for (var i = 0; i < this.batches.length; i++)
    {
        the_Renderer.draw_Batch(this.batches[i]);
    }
}

TargetX.prototype.set_Stage = function (param_t)
{
    var matrix = this.begin_Transformation;
    var pos = new Vector3(this.interpolator_X.interpolate(param_t),
        this.interpolator_Y.interpolate(param_t),
        this.interpolator_Z.interpolate(param_t));
    matrix.embed_Translation(pos);
    this.begin_Transformation = matrix;
    this.hitShape.origin = pos;
}


 