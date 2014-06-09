/*
    
    function MeshNode()
    {
        this.materials  = [];
        this.vertices   = [];
        this.indices    = [];
        this.subMeshCnt = 0;
    }
    
    MeshNode.prototype.push = function( vertices, indices, material )
    {
        this.materials[ this.subMeshCnt ] = material;
        this.vertices [ this.subMeshCnt ] = vertices;
        this.indices  [ this.subMeshCnt ] = indices;
 
    this.subMeshCnt++;
    }
    
    
    function build_TriangleList( mNodelist )
    {
        var nodes           = mNodelist[0];
        var transformations = mNodelist[1];
        var triangleList    = [];
      
       console.info( "OK " + nodes.length );
               
        for( var n = 0; n < nodes.length; n++ )
        {
           var mNode = nodes[n];
           var smCnt = mNode.subMeshCnt;
           var trans = transformations[n];
         
            // For each submesh
            for( var i = 0; i < smCnt; i++ )
            {
               var vertices = mNode.vertices[i];
               var indices  = mNode.indices[i];
               var material = mNode.materials[i];
               var iCnt     = indices.length-2; // Off by TWO. This is a bug. What the shit?
               var tCnt     = iCnt/3;               
               
                for( var j = 0; j < tCnt; j++ )
                {
                    var v1       = vertices[  indices[ (j*3)   ] ];
                    var v2       = vertices[  indices[ (j*3)+1 ] ];
                    var v3       = vertices[  indices[ (j*3)+2 ] ];
                    var triangle = new Triangle( v1,v2,v3, material, trans  );
               
                triangleList.push( triangle );
                }
            }
        }
    
    
    console.info("OK");
    console.info( triangleList.length );
    }
    
    
   
*/
    
    
  
    
   
    
    
    
   
    
    
    
     
    
    
   
    
       
    
    
       
       
    

       
       
       
       
       
       
       
 
      
       
       
       
       
       
       
       
       
       
  
    