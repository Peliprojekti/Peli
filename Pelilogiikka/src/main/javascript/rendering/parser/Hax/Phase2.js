   
   
    function build_TriangleList( vertices, indices, material, transformation, retPtr )
    {
        var triCnt = (indices.length-2) / 3;      // OFF BY TWO. WTF?
        
        for( var i = 0; i < triCnt; i++ )
        {
            var a = vertices[ indices[(3*i)+0] ];
            var b = vertices[ indices[(3*i)+1] ];
            var c = vertices[ indices[(3*i)+2] ];
            
            // Transform vertices
            a.point = transformation.transform( a.point );
            b.point = transformation.transform( b.point );
            c.point = transformation.transform( c.point );
        
        retPtr.push(  new Triangle( a,b,c, material) );
        }   
    }
    
    
    
    
    function parse_Mesh( node, description, transformation, retPtr )
    {
        var materialSets        = node.get_Subfields("materials");                 
        var material_Attributes = materialSets[0].get_Subfields("attributes");
        
        var materials           = build_Materials( material_Attributes );
        var meshPath            = relative_Path( description[3].casted() );
        var meshes              = extract_MeshData( meshPath );
         
        ASSERT( meshes[0].length == meshes[1].length, "Vertex - Index incongruency"  );
        ASSERT( meshes[0].length == materials.length, "Mesh - Material incongruency" );
         
        var vertexBatches = meshes[0];
        var indexBatches  = meshes[1]; 
        var batchCount    = meshes[0].length;
        
        
        // For each batch
        for( var b = 0; b < batchCount; b++ ) 
        {
             var vertices = vertexBatches[b];
             var indices  =  indexBatches[b];
             var material =     materials[b];
          
        build_TriangleList( vertices, indices, material, transformation, retPtr );
        }
       
    }     
    
    
    
    
    