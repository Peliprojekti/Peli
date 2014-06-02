    function Intersection( valid, point, t, s )
    {
        this.valid = valid;
        this.point = point;
        this.t     = t;
        this.s     = s;
    }
    

    // Move elsewhere
    function Ray3( origin, direction )
    {
        this.origin    = origin;
        this.direction = direction;
    }
    


    Ray3.prototype.intersects = function( plane3 )
    {
         // ( A + tV - P )*N  = 0
         // ((A-P)+tV)*N      = 0
         //  (A-P)*N + t(V*N) = 0
         //  t(V*N)           = -(N*(A-P))
         //  t                = -(N*(A-P))/(V*N)
       var numerator   = -( plane3.normal.dot( this.origin.sub( plane3.point)) );
       var denominator = plane3.normal( this.direction );
       var epsilon     = 0.00001; // Something suitably small.... Parametrise?
       
       if( denominator < epsilon ) 
           return new Intersection( false, new Vector3(0,0,0) , 0.0, 0.0 );
       
       var t     = numerator/denominator;
       var inter = this.origin + this.direction.mul( t );
       
    return new Intersection( true, inter, t );
    }
    
    

    function Plane3( point, normal )
    {
        this.point = point;
        this.normal = normal;
    }   
    
    
    
    
    
    function Lineseg2( begin, end )
    {
        this.begin = begin;
        this.end   = end;
    }   
    
    
     // Move elsewhere
    function Ray2( origin, direction )
    {
        this.origin    = origin;
        this.direction = direction;
    }


    Ray2.prototype.intersects = function( lineseg2 )
    {
       // A + tV       =  B + sW        | xW
       // AxW + t(VxW) =  BxW + s(WxW)
       // AxW + t(VxW) =  BxW + 0
       // t(VxW)       = (BxW - AxW)    | *V
       // t(VxW)*V     = (BxW - AxW)*V
       // t            = (BxW - AxW)*V / (VxW)*V    // Intersection parameter along the ray. [0,+inf] to be valid.
       
       // A + tV       = B + sW         | xV
       // AxV + t(VxV) = BxV + s(WxV)
       // AxV + 0      = BxV + s(WxV)   | *V  
       //(AxV - BxW)   = s(WxV) * V
       //(AxV - BxW)*V = s(WxV) * V
       // s            = (AxV - BxW)*V / (WxV)*V  // Intersection parameter along the segment. [0,1] to be valid.
   
       
    //return new Intersection( true, inter, t );
    }
    
    
    
    
    function Viewtriangle( origin, lookVector, angle, farPlane ) 
    {
        this.origin = origin;
        this.look   = lookVector;
    }