

    function QuadNode()
    {
        this.q1 = null;
        this.q2 = null;
        this.q3 = null;
        this.q4 = null;
    }
    
    function QuadTree()
    {
        this.children = new QuadNode();
    }
    
  
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
        
        /*
        var half        = split( triangleList, byX );
        var left_Side   = split( half[0], byZ );
        var right_Side  = split( half[1], byZ );
            
        var          n1 =  left_Side[0];
        var          n2 =  left_Side[1];
        var          n3 = right_Side[0];
        var          n4 = right_Side[1];
        */
        
    }
    
    
 
    
  
    function partition_Geometry( triangleList )
    {
        
        var root = create_Node( triangleList );
        
        
        /*
            var left_Side   = split( half[0], byZ );
            var right_Side  = split( half[1], byZ );
        
            var n1 =  left_Side[0];
            var n2 =  left_Side[1];
            var n3 = right_Side[0];
            var n4 = right_Side[1];
        
            var total2 = n1.length + n2.length + n3.length + n4.length;
        
            alert( total1 + " versus " total2 );
        */
       
    alert("DONE");
    }