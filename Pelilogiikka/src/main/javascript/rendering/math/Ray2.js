    

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
        
        
        var    matrix = new Matrix22( [  V.x , -W.x,
                                         V.y , -W.y ] );
        
        var       vec = pointA.subtract( this.origin );
       
        if( !matrix.invertible() ) return false;
        
        var inverted = matrix.invert();
        
        var params = new Vector2( vec.x * inverted.data[0] + vec.y * inverted.data[1],
                                  vec.x * inverted.data[2] + vec.y * inverted.data[2] );    // Column matrix product
        
      //  alert( params.x + " " + params.y );
        
        if( params.x >= 0.0 )   // Intersection is on Ray 
            if( params.y >= 0.0 && params.y <= 1.0 )    // Intersection is on the target segment
            {
                return true;
            }

        
    return false;
    }