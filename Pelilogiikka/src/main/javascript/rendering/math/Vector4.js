
function Vector4( x,y,z,w )
{   
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
}


Vector4.prototype.toVec3 = function( vec4 )
{
    return new Vector3( this.x / this.w,
                        this.y / this.w,
                        this.z / this.w );
}

Vector4.prototype.report = function()
{
    alert("< "+this.x +" , "+ this.y + " , " +this.z+" , " + this.w+ " >");
}

