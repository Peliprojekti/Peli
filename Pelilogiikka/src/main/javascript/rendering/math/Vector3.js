

function Vector3( x,y,z )
{   
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.set = function( x,y,z )
{
    this.x = x;
    this.y = y;
    this.z = z;
}

Vector3.prototype.add = function( vec3 )
{
    return new Vector3(  this.x+vec3.x ,
                         this.y+vec3.y ,
                         this.z+vec3.z  );
}

Vector3.prototype.sub = function( vec3 )
{
    return new Vector3(  this.x-vec3.x ,
                         this.y-vec3.y ,
                         this.z-vec3.z );
}

Vector3.prototype.mul = function( scalar )
{
    return new Vector3(  this.x*scalar ,
                         this.y*scalar ,
                         this.z*scalar );
}

Vector3.prototype.dot = function( vec3 )
{
    return ( this.x *vec3.x + this.y * vec3.y + this.z * vec3.z);
}

Vector3.prototype.cross = function( vec3 )
{
    return new Vector3( (this.y * vec3.z - this.z * vec3.y) ,
                        (this.z * vec3.x - this.x * vec3.z) ,
                        (this.x * vec3.y - this.y * vec3.x) );
}

Vector3.prototype.length = function() 
{
    var length_Squared = this.x*this.x + this.y*this.y + this.z*thisz;
    return Math.sqrt( length_Squared );
}

Vector3.prototype.normalized = function()
{
    var length_Squared = this.x*this.x + this.y*this.y + this.z*thisz;
    var length         = Math.sqrt( length_Squared );
    
    return new Vector3( this.x / length,
                        this.y / length,
                        this.z / length );
}


Vector3.prototype.report = function()
{
    alert("< "+this.x +" , "+ this.y + " , " +this.z+" >");
}

