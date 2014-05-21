
       
function Interpolator( begin_Value, end_Value ) 
{
    this.begin = begin_Value;
    this.end   = end_Value;
}




Interpolator.prototype.interpolate = function( t )
{
    return ( 1.0 - t )*this.begin + t*( this.end );   // ( 1.0-t)begin + (t)(end-begin) 
}

