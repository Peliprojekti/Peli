

    
  
    function byX( a,b )
    {
         if (a.v1.point.x <= b.v1.point.x) return -1;
         else return 1;
    }
    
    function byZ( a,b )
    {
         if (a.v1.point.x <= b.v1.point.x) return -1;
         else return 1;
    }
    
   function split( triangleList, funct )
   {
        var sorted = triangleList.sort(        funct           );
        var middle =         Math.ceil(    sorted.length/2     );
        var low    =     sorted.splice(      0 , middle        );
        var high   =     sorted.splice( middle , sorted.length );
       
   return [ low,high ];
   }
  
  
   
    function create_Node( triangleList )
    {
        var batch       = build_WorldBatch( triangleList );
        var node        = new QuadNode( batch );
        
    return node; // This good for now
    }
    
    
 
    
  
    function partition_Geometry( triangleList )
    {
        var root = create_Node( triangleList );
        
    return new QuadTree( root );
    }