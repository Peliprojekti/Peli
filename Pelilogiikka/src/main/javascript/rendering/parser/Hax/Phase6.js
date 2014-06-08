
    
    function new_Bank( triangle )
    {
     return new VertexBank( triangle.material.texture1, 
                            triangle.material.texture2,
                            triangle.material.texture3,
                            triangle.material.texture4 );
    }
    
    
    function byMat( a,b )
    {
         if ( a.material.hash <= b.material.hash ) return -1;
         if ( a.material.hash >= b.material.hash ) return  1;
         return 0;
    }
    

    function build_WorldBatch( triangleList )
    {
        
        // Sort the triangleList by material hash
        var sorted = triangleList.sort( byMat );
        
        var banks           = [];           
        var bankIndex       = 0;
        var triangle        = triangleList[0];
        var currentHash     = triangle.material.hash;
        banks[ bankIndex ]  = new_Bank( triangle );
        
        banks[ bankIndex ].feed_Triangle( triangle );
         
        for( var i = 1; i < sorted.length; i++ )
        {
            triangle = triangleList[i]
            
            if( triangle.material.hash != currentHash ) 
            {
                banks[ ++bankIndex ] = new_Bank( triangle );
                currentHash          = triangle.material.hash;
            }
            
        banks[ bankIndex ].feed_Triangle( triangle );   
        }
            
    console.info("Done with " + banks.length + " banks.  " );     
    
    return new WorldBatch( banks, triangleList );
    }
