

function Vector2( x,y )
{   
    this.x = x;
    this.y = y;
}

Vector2.prototype.set = function( x,y )
{
    this.x = x;
    this.y = y;
}

Vector2.prototype.add = function( vec2 )
{
    return new Vector2(  this.x+vec2.x ,
                         this.y+vec2.y );
}

Vector2.prototype.sub = function( vec2 )
{
    return new Vector2(  this.x-vec2.x ,
                         this.y-vec2.y );
}

Vector2.prototype.mul = function( scalar )
{
    return new Vector2(  this.x*scalar ,
                         this.y*scalar );
}

Vector2.prototype.dot = function( vec2 )
{
    return ( this.x *vec2.x + this.y * vec2.y );
}


Vector2.prototype.length = function() 
{
    var length_Squared = this.x*this.x + this.y*this.y;
    return Math.sqrt( length_Squared );
}

Vector2.prototype.normalized = function()
{
    var length_Squared = this.x*this.x + this.y*this.y;
    var length         = Math.sqrt( length_Squared );
    
    return new Vector3( this.x / length,
                        this.y / length  );
}

Vector2.prototype.projected = function( vec2 )
{
    var t = this.dot( vec2 ) / vec2.dot(vec2);
    return vec2.mul( t );
}


Vector2.prototype.report = function()
{
    alert("< "+this.x +" , "+ this.y + " , " +this.z+" >");
}

