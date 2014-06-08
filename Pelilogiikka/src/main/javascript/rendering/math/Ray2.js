    

    function Ray2( origin, direction )
    {
        this.origin    = origin;
        this.direction = direction.normalized();
    }

// A + tV        = B + sW 
// tV - sW       = (B-A)
// <t,s>[V,-W]^T = (B-A)
//  <t,s>M       = (B-A)
//  <t,s>M*M^-1  = (B-A)M^-1
//         <t,s> = (B-A)M^-1

    Ray2.prototype.intersects = function( pointA, pointB )
    {
        var         V = this.direction;
        var         W = pointB.subtract( pointA );
        var    matrix = new Matrix22( [  V.x , -W.x,
                                         V.y , -W.y ] );
        
        var       vec = pointA.subtract( this.origin );
       
        if( !matrix.invertible() ) return false;
        
        var params = matrix.invert().transform( vec );
        
        if( params.x >= 0.0 )   // Intersection is on Ray 
            if( params.y >= 0.0 && params.y <= 1.0 )    // Intersection is on the target segment
            {
             //   console.info("HIT" + params.x + " + " + params.y );
                return true;
            }
 
    //console.info("MISS: " + params.x + " / " + params.y );
    return false;
    }