    function Triangle( v1, v2, v3, material )
    {
        this.v1       = v1;
        this.v2       = v2;
        this.v3       = v3;
        this.material = material;
    }
     
   
    function Vertex( point, uv, normal, binormal, tangent )
    {
        this.point    = point;
        this.uv       = uv;
        this.normal   = normal;
        this.binormal = binormal;
        this.tangent  = tangent;
    }
  
    function VertexBank( texture1, texture2, texture3, texture4 )
    {
        this.points       = [];
        this.texCoords    = [];
        this.normals      = [];
        this.binormals    = [];
        this.tangents     = [];
        
        this.texture1     = texture1;
        this.texture2     = texture2;
        this.texture3     = texture3;
        this.texture4     = texture4;
        
        this.indices      = []; // Generate
        this.runner       = 0;
        
    }
    
    VertexBank.prototype.feed_Triangle = function ( triangle )
    {
        this.points.push( triangle.v1.point.x );
        this.points.push( triangle.v1.point.y );
        this.points.push( triangle.v1.point.z );
        
        this.points.push( triangle.v2.point.x );
        this.points.push( triangle.v2.point.y );
        this.points.push( triangle.v2.point.z );
        
        this.points.push( triangle.v3.point.x );
        this.points.push( triangle.v3.point.y );
        this.points.push( triangle.v3.point.z );
        
        this.texCoords.push( triangle.v1.uv.x );
        this.texCoords.push( triangle.v1.uv.y );
        
        this.texCoords.push( triangle.v2.uv.x );
        this.texCoords.push( triangle.v2.uv.y );
        
        this.texCoords.push( triangle.v3.uv.x );
        this.texCoords.push( triangle.v3.uv.y );
        
        // Texcoords fine when entering the bank        
        
        this.normals.push( triangle.v1.normal.x );
        this.normals.push( triangle.v1.normal.y );
        this.normals.push( triangle.v1.normal.z );
        
        this.normals.push( triangle.v2.normal.x );
        this.normals.push( triangle.v2.normal.y );
        this.normals.push( triangle.v2.normal.z );
        
        this.normals.push( triangle.v3.normal.x );
        this.normals.push( triangle.v3.normal.y );
        this.normals.push( triangle.v3.normal.z );
        
        this.binormals.push( triangle.v1.binormal.x );
        this.binormals.push( triangle.v1.binormal.y );
        this.binormals.push( triangle.v1.binormal.z );
        
        this.binormals.push( triangle.v2.binormal.x );
        this.binormals.push( triangle.v2.binormal.y );
        this.binormals.push( triangle.v2.binormal.z );
        
        this.binormals.push( triangle.v3.binormal.x );
        this.binormals.push( triangle.v3.binormal.y );
        this.binormals.push( triangle.v3.binormal.z );
        
        this.tangents.push( triangle.v1.tangent.x );
        this.tangents.push( triangle.v1.tangent.y );
        this.tangents.push( triangle.v1.tangent.z );
        
        this.tangents.push( triangle.v2.tangent.x );
        this.tangents.push( triangle.v2.tangent.y );
        this.tangents.push( triangle.v2.tangent.z );
        
        this.tangents.push( triangle.v3.tangent.x );
        this.tangents.push( triangle.v3.tangent.y );
        this.tangents.push( triangle.v3.tangent.z );
    
        // This had better be correct...
        // IF not, perhaps we can render by value without indices?
        this.indices.push( this.runner++ );
        this.indices.push( this.runner++ );
        this.indices.push( this.runner++ );
    }
     
     
     
    function Material( texture1, texture2, texture3, texture4 )
    {
        this.texture1 = texture1;
        this.texture2 = texture2;
        this.texture3 = texture3;
        this.texture4 = texture4;
    
    this.build_Hash();
    }
    
    
    Material.prototype.build_Hash = function()
    {
        var string    = this.texture1.source + this.texture2.source + this.texture3.source + this.texture4.source;
        this.hash     = string.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
        this.hash    /= 1000000;
        this.hash     = Math.floor( Math.abs(this.hash) );     // Seems legit... Need to see if its good for all possible cases. Seems to end up between [20 and a few k ]
    }
    
    
    
    
    
    // Axis Aligned Bounding Rectangle
    function AABR( minX, maxX, minZ, maxZ )
    {
        this.points    = [];
        
        this.points[0] = new Vector2( minX, maxZ );
        this.points[1] = new Vector2( maxX, maxZ );
        this.points[2] = new Vector2( minX, minZ );
        this.points[3] = new Vector2( maxX, minZ );
    
    
        var string  = "AABB:";
            string += "\n<" + Math.floor(minX) + " , " +Math.floor(maxZ) +" >";
            string += "\n<" + Math.floor(maxX) + " , " +Math.floor(maxZ) +" >";
            string += "\n<" + Math.floor(minX) + " , " +Math.floor(minZ) +" >";
            string += "\n<" + Math.floor(maxX) + " , " +Math.floor(minZ) +" >";
            
        console.info( string );
        
    }
    
    
    
    
    function QuadNode( triangleList, target_BatchSize, depth )
    {
        depth++;
        
        this.batch    = build_WorldBatch( triangleList );
        
        if( triangleList.length < target_BatchSize )
        {
            console.log( "Node finished at " + depth + " with " + triangleList.length + " triangles");
            return;
        }
        else
            console.log( "Node proceeding at " + depth + " with " + triangleList.length + " triangles");
       
 
        var triangleCnt = triangleList.length;
        var zSorted     = [];
        
        zSorted = triangleList.sort( function(a,b)
        {
            return a.v1.point.z - b.v1.point.z;
        });
        
        
        var middleZ = Math.ceil( zSorted.length/2);
        
        var nearZ       = zSorted.splice( 0, middleZ        );
        var farZ        = zSorted;
        
        var xSortedNear = [];            // Lower half sorted
        var xSortedFar  = [];            // Upper half sorted
        
        xSortedNear = nearZ.sort( function(a,b)
        {
            return a.v1.point.x - b.v1.point.x;
        });
        
        xSortedFar = farZ.sort( function(a,b)
        {
            return a.v1.point.x - b.v1.point.x;
        });
        
 
        var minZ =   nearZ[        0         ].v1.point.z;
        var maxZ =    farZ[    farZ.length-1 ].v1.point.z;
             
             
        var hax1 = xSortedNear.length-1;
        var hax2 = xSortedFar.length-1;
        
        var minX = ( xSortedNear[0].v1.point.x < xSortedFar[0].v1.point.x )  ? 
                     xSortedNear[0].v1.point.x : xSortedFar[0].v1.point.x;
        
        var maxX = ( xSortedNear[hax1].v1.point.x > xSortedFar[hax2].v1.point.x )  ? 
                     xSortedNear[hax1].v1.point.x : xSortedFar[hax2].v1.point.x;
        
        
        var q1   = xSortedFar.splice(  0, Math.ceil( xSortedFar.length/2  )  );
        var q2   = xSortedFar;
        
        var q3   = xSortedNear.splice( 0, Math.ceil( xSortedNear.length/2 )  );
        var q4   = xSortedNear;
        
        var sigma = q1.length + q2.length + q3.length + q4.length;
        
        ASSERT( sigma == triangleCnt , "VITUIX MENI " + sigma + " vs " + triangleCnt );
        
        
        this.boundingRect = new AABR( minX,maxX, minZ,maxZ);
    
        /*
        this.q1           = new QuadNode( q1, target_BatchSize, depth );
        this.q2           = new QuadNode( q2, target_BatchSize, depth );
        this.q3           = new QuadNode( q3, target_BatchSize, depth );
        this.q4           = new QuadNode( q4, target_BatchSize, depth );
        */
    }
    
    
    
    
    

    
    
    QuadNode.prototype.render = function( viewFrustrum )
    {
      var hits = viewFrustrum.contains( this.boundingRect );
      
      // console.info(hits);
    /*
        if( hits == 4 )
        {
            console.info("Entire node inside - Draw and return");
        }
        else
            if( hits > 0 )
            {
                console.info("Node partially inside - Continue query");
                
            }
            else
                console.info("Node completely outside - Stop query and draw nothing");
    */
  
    this.batch.render();
    }
    
    
    
    function QuadTree( triangleList )
    {
        this.rootNode = new QuadNode( triangleList, 32, 1 );
    }
    
    
    QuadTree.prototype.render = function( viewFrustrum )
    {
       this.rootNode.render( viewFrustrum );
   
    }