
    function Plane3( point, normal )
    {
        this.point  = point;
        this.normal = normal;
    }

    Plane3.prototype.rotate( mat33 )
    {
        ASSERT_TYPE( Matrix33, mat33 );
        this.normal = mat33.transform( this.normal );
    }



    function Ray3( origin, direction )
    {
        this.origin    = origin;
        this.direction = direction.normalized();
    }
    
    
    Ray3.prototype.intersects( plane )
    {
        
        
        
    }