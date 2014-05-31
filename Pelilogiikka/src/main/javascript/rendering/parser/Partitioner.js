
    
    function BoundingBox( minX, minY, minZ, maxX, maxY, maxZ )
    {
        this.minX = minX;
        this.minY = minY;
        this.minZ = minZ;
        
        this.maxX = maxX;
        this.maxY = maxY;
        this.maxZ = maxZ;
        
    }
    

    function OctNode()
    {
        this.matGroups = [];       // Contains a list of triangles of that material type.
        
    
    }