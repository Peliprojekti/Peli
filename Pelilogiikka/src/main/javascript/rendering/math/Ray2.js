    

    function Ray2( origin, direction )
    {
        this.origin    = origin;
        this.direction = direction.normalized();
    }

// A + tV        =    B + sW 
//     tV - sW   =    B - A
//   <t,s>[V,W]  =    B - A
//   <t,s>M      =    B - A
//   <t,s>       =   (B - A)M^-1




    Ray2.prototype.intersects = function( pointA, pointB )
    {
        var         A = this.origin;
        var         B = pointA;
        var         V = this.direction;
        var         W = pointB.subtract( pointA );
        
        
        var    matrix = new Matrix22( [  V.x , V.y,
                                        -W.x , -W.y ] );
        
        var vec       = pointA.subtract( this.origin );
       
        if( !matrix.invertible() ) return false;
        
        var inverted = matrix.invert();
        var params   = inverted.transform( vec );
        
      //  alert( params.x + " " + params.y );
        
        if( params.x >= 0.0 )   // Intersection is on Ray 
            if( params.y >= 0.0 && params.y <= 1.0 )    // Intersection is on the target segment
            {
                return true;
            }

        
    return false;
    }