   
   
    function build_TriangleList( vertices, indices, material, retPtr )
    {
        var triCnt = (indices.length-2) / 3;      // OFF BY TWO. WTF?
        
        for( var i = 0; i < triCnt; i++ )
        {
            var num1 = (3*i)+0;
            var num2 = (3*i)+1;
            var num3 = (3*i)+2;
      
            var i1   = indices[ num1  ];
            var i2   = indices[ num2  ];
            var i3   = indices[ num3  ];
            
            var a    = vertices[ i1 ];
            var b    = vertices[ i2 ];
            var c    = vertices[ i3 ];
                
        retPtr.push( new Triangle( a,b,c, material) );
        }   
    }
  
    
    
    
    
    
    
    
    function parse_Mesh( node, description, transformation, retPtr )
    {
        var materialSets        = node.get_Subfields("materials");                 
        var material_Attributes = materialSets[0].get_Subfields("attributes");
        
        var materials           = build_Materials( material_Attributes );
        var meshPath            = relative_Path( description[3].casted() );
        var meshes              = extract_MeshData( meshPath, transformation );
         
        ASSERT( meshes[0].length == meshes[1].length, "Vertex - Index incongruency"  );
        ASSERT( meshes[0].length == materials.length, "Mesh - Material incongruency" );
        
        var batchCount    = meshes[0].length;
        var vertexBatches = meshes[0];
        var indexBatches  = meshes[1]; 
        
        // For each batch
        for( var b = 0; b < batchCount; b++ ) 
        {
            build_TriangleList( vertexBatches[b], indexBatches[b], materials[b],  retPtr );
        }
       
    }     
    
    
    
    
    function parse_DiscreteMesh( node, description  )
    {
        var subBatches           = [];
        var transformation       = new Matrix44();      // ID
        
        var materialSets         = node.get_Subfields("materials");                 
        var material_Attributes  = materialSets[0].get_Subfields("attributes");
        
        var materials            =  build_Materials( material_Attributes       );
        var meshPath             =    relative_Path( description[3].casted()   );
        var meshes               = extract_MeshData( meshPath, transformation  );
             
        var batchCount           = meshes[0].length;
        var vertexBatches        = meshes[0];
        var indexBatches         = meshes[1];      
             
        // For each batch
        for( var m = 0; m < batchCount; m++ )
        {
            var vertices  = vertexBatches[ m ];
            var indices   =  indexBatches[ m ];
            
            var posBuffer = [];   
            var uvBuffer  = [];
            var iBuffer   = [];
            
           for( var i = 0; i < vertices.length; i++ )
           {
               var vertex = vertices[i];
               
               posBuffer.push( vertex.point.x );
               posBuffer.push( vertex.point.y );
               posBuffer.push( vertex.point.z );
            
               uvBuffer.push ( vertex.uv.x    );
               uvBuffer.push ( vertex.uv.y    );
            
            }
                
            for( var j = 0; j < indices.length; j++ )
            {
                iBuffer.push( indices[j] );
            }
           
            var matSet  = materials[ m ];
            var texture = matSet.texture1;
            subBatches.push( new Batch( posBuffer, iBuffer, uvBuffer, texture ) );
        }
   
    return subBatches;
    }     
    
    