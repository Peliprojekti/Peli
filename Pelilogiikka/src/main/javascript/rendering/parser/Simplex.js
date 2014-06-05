    function HyperMesh()
    {
        this.materials = [];
        this.vertices  = [];
        this.indices   = [];
        this.runner    = 0;
    }
    
    HyperMesh.prototype.push = function( vertices, indices, material )
    {
        this.materials[ this.runner ] = material;
        this.vertices [ this.runner ] = vertices;
        this.indices  [ this.runner ] = indices;
    
    this.runner++;
    }
    
    
    function World( worldName )
    {
        console.log("Varning! Kapitalförvaltning inte på plats. Strukturer laddas och laddas multiplie gånger!");
        
        var fullPath = "/data/"+worldName+"/"+worldName+".irr";
        var parser   = new Parser( fullPath );
      
    parse_Scene( parser.the_Document );
    }
    
    
    
    
    
    function read_Node( node_Variables )
    {
        var node_Position;
        var node_Rotation
        var node_Scale;
        var node_Mesh = "NULL"
        
        node_Variables.forEach( function( variable )
        {
            if( variable.label == "Position") node_Position = variable;
            if( variable.label == "Rotation") node_Rotation = variable; 
            if( variable.label == "Scale"   ) node_Scale    = variable;
            if( variable.label == "Mesh"    ) node_Mesh     = variable;
        
        });
        
    return [ node_Position, node_Rotation, node_Scale, node_Mesh ];
    }
    
     
    function parse_Scene( document ) 
    { 
        var nodes       = document.get_Subfields("node");
        var geometry    = [];
        var lights      = [];
        
        for( var i = 0; i < nodes.length; i++ )
        {  
            var node_Type                = nodes[i].get_Type();
            var node_Attributes          = nodes[i].get_Subfields("attributes");
            var node_Variables           = node_Attributes[0].get_Variables();                 
            var node_Description         = read_Node( node_Variables                  );
            var node_Transformation      = build_Matrix( node_Description[0].casted() ,
                                                         node_Description[1].casted() ,
                                                         node_Description[2].casted() );
            switch( node_Type ) 
            {
                case "mesh":   geometry.push( parse_Mesh( nodes[i], node_Description ) );
                break;
                
                case "light": 
                break;
            
                default: console.log("Unknown Node encountered - Skipping: " + type );
            }
        }
        
    // Now, split the geometry into a triangle soup, preserving the material associations.
    // Then sort the soup recursively spatially, and for each level, create a set of worldMeshes, one for each material involved.   
    
    alert( "Meshnodes: "+ geometry.length );
    }
    
   
    
    function parse_Mesh( node, description )
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
        var hyperMesh     = new HyperMesh();
        
        for( var i = 0; i < batchCount; i++ ) hyperMesh.push( vertexBatches[i], indexBatches[i], materials[i] );
     
    return hyperMesh;
    }           
    
    
    
    
    
    
       
    function build_Matrix( position, rotation, scale )
    {
        var orient = new Matrix33();
        var rot    = new Matrix33();
        
        rot.RotationX( rotation.x );
        orient = orient.multiply( rot );
        
        rot.RotationY( rotation.y );
        orient = orient.multiply( rot );
        
        rot.RotationY( rotation.z );
        orient = orient.multiply( rot );
           
        var m1 = new Matrix44();
            m1.embed( orient );
            
        var p   = position;
        var m2  = new Matrix44([ 1.0,   0,   0,   0,
                                   0, 1.0,   0,   0,
                                   0,   0, 1.0,   0,
                                 p.x, p.y, p.z, 1.0 ]);
             
        var s  = scale;
        var m3 = new Matrix44([ s.x,   0,   0,   0,
                                  0, s.y,   0,   0,
                                  0,   0, s.z,   0,
                                  0,   0,   0, 1.0 ]);
            
        var ret = m3.multiply( m2 );
            ret = ret.multiply( m1 );
            
    return ret;
    }
    
    
    
    
    function read_Material( material_Variables )
    {
        var material_Ambient;
        var material_Diffuse;
        var material_Specular;
        var material_Shine;
        var material_Param1;
        var material_Param2;
        var material_Texture1       = "NULL";
        var material_Texture2       = "NULL";
        var material_Texture3       = "NULL";
        var material_Texture4       = "NULL";
        var material_textureWrap1;
        var material_textureWrap2;
        var material_textureWrap3;
        var material_textureWrap4;
    
        material_Variables.forEach( function( variable )
        {
              if( variable.label == "Ambient"          ) material_Ambient      = variable;
              else
              if( variable.label == "Diffuse"          ) material_Diffuse      = variable;
              else
              if( variable.label == "Specular"         ) material_Specular     = variable;
              else
              if( variable.label == "Shininess"        ) material_Shine        = variable;
              else
              if( variable.label == "Param1"           ) material_Param1       = variable;
              else
              if( variable.label == "Param2"           ) material_Param2       = variable;
              else
              if( variable.label == "Texture1"         ) material_Texture1     = variable;
              else
              if( variable.label == "Texture2"         ) material_Texture2     = variable;
              else
              if( variable.label == "Texture3"         ) material_Texture3     = variable;
              else
              if( variable.label == "Texture4"         ) material_Texture4     = variable;
              else
              if( variable.label == "TextureWrap1"     ) material_textureWrap1 = variable;
              else
              if( variable.label == "TextureWrap2"     ) material_textureWrap2 = variable;
              else
              if( variable.label == "TextureWrap3"     ) material_textureWrap3 = variable;
              else
              if( variable.label == "TextureWrap4"     ) material_textureWrap4 = variable;
        });
            
        var ret = [];
          
            ret.push( parseFloat( material_Ambient.value  ) );
            ret.push( parseFloat( material_Diffuse.value  ) );
            ret.push( parseFloat( material_Specular.value ) );
            ret.push( parseFloat( material_Shine.value    ) );
              
            ret.push( parseFloat( material_Param1.value   ) );
            ret.push( parseFloat( material_Param2.value   ) );
             
            ret.push( material_Texture1.value                );
            ret.push( material_Texture2.value                );
            ret.push( material_Texture3.value                );
            ret.push( material_Texture4.value                );
              
            ret.push( material_textureWrap1.value            );
            ret.push( material_textureWrap2.value            );
            ret.push( material_textureWrap3.value            );
            ret.push( material_textureWrap4.value            );
              
    return ret;
    }
    
    
    function build_Materials( attributes )
    {
        var MAX_TEXTURES = 4;
        var materialList = [];
                
        attributes.forEach( function ( attributes )
        {
            var variables    = attributes.get_Variables();
            var description  = read_Material( variables );
            
            var textureList  = [];
            var texturePaths = [ relative_Path( description[6] ), relative_Path( description[7] ), 
                                 relative_Path( description[8] ), relative_Path( description[9] ) ];  
            
            for( var t = 0; t < MAX_TEXTURES; t++ ) 
            {
                if( texturePaths[t] == "NULL") textureList.push( new Texture( "/data/NULL.png" ) );  
                else
                    textureList.push( new Texture( texturePaths[t] ) );
            }
            
        materialList.push( textureList );
        });
    
    return materialList;
    }
    
    
       
       
       
    function extract_MeshData( meshPath )
    {    
        var meshParser   = new Parser( meshPath );
        
        var vertexList   = [];
        var indexList    = [];
        var fields       = meshParser.the_Document.get_Subfields( "indices" );
        
        fields.forEach( function( field )           
        {
            var lines   = field.rawData.split("\n");
            var indices = [];
            
            for( var t = 1; t < lines.length; t++ )     // Skip over the header [0]
            {
                var tokens  = lines[t].split(" ");
                 
                for( var i = 0; i < tokens.length; i++ )  indices.push( parseInt( tokens[i] ) );
            }   
           
        indexList.push( indices );
        });
        
        fields = meshParser.the_Document.get_Subfields( "vertices" );
     
        for( var f = 0; f < fields.length; f++ )
        {
            var field     = fields[f];
            var lines     = field.rawData.split("\n");
            var positions = [];
            var texCoords = [];
            var normals   = [];
            var binormals = [];
            var tangents  = [];
            
            for( var i = 1; i < lines.length; i++ )     // Skip the header at 0
            {
                var line   = lines[i];
                var tokens = line.split(" ");
                
                var x = parseFloat( tokens[0]);
                var y = parseFloat( tokens[1]);
                var z = parseFloat( tokens[2]);
                  
                var nX = parseFloat( tokens[3]);
                var nY = parseFloat( tokens[4]);
                var nZ = parseFloat( tokens[5]);
                             
                var u  = parseFloat( tokens[7]);
                var v  = parseFloat( tokens[8]);
                
                var bX = parseFloat( tokens[9]);
                var bY = parseFloat( tokens[10]);
                var bZ = parseFloat( tokens[11]);
                  
                var tX = parseFloat( tokens[12]);
                var tY = parseFloat( tokens[13]);
                var tZ = parseFloat( tokens[14]);
                
                positions.push( x  );
                positions.push( y  );
                positions.push( z  );
                
                texCoords.push( u  );
                texCoords.push( -v );       // Negate V to accomodate handedness shift
                
                normals.push( nX   );
                normals.push( nY   );
                normals.push( nZ   );
               
                binormals.push( bX );
                binormals.push( bY );
                binormals.push( bZ );  // Flip the binormal attribute or not?
                
                tangents.push( tX );
                tangents.push( tY );
                tangents.push( tZ );
            }
           
        vertexList.push( [positions, normals, binormals, tangents, texCoords] );
        }
        
    return [ vertexList, indexList ];
    }

       
       
       