
    function relative_Path( full_Path )
    {
        var clip = full_Path.indexOf( "data" );
        if( clip == -1 ) return "NULL";
        return  full_Path.substring( clip, full_Path.length );
    }
    



    function Vertex( pos, norm, uv )
    {
        this.position  = pos;
        this.normal    = norm;
        this.texcoords = uv; 
    }

    Vertex.prototype.report = function()
    {
        alert(" Vertex: [ " + this.position.x + " , "+ this.position.y + " , "+ this.position.z + "  ]");
    }
    

    function Parser( fileName )
    {
        // Grab the file contents.
        var request = new XMLHttpRequest();
            request.open("GET", fileName, false);
            request.send(null);
        this.the_Document = new Field( request.responseText );
    
    };
    
       
    
    
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
              
              ret.push( material_textureWrap1.value )
              ret.push( material_textureWrap2.value )
              ret.push( material_textureWrap3.value )
              ret.push( material_textureWrap4.value )
            
    return ret;
    }
    
    
    
    function read_Node( node_Variables )
    {
        var node_Position;
        var node_Rotation;
        var node_Scale;
        var node_Mesh       = "NULL"
        
        node_Variables.forEach( function( variable )
        {
            if( variable.label == "Position"         ) node_Position = variable;
            else
            if( variable.label == "Rotation"         ) node_Rotation = variable;
            else
            if( variable.label == "Scale"            ) node_Scale    = variable;
            else
            if( variable.label == "Mesh"             ) node_Mesh     = variable;
        });
        
    return [ node_Position, node_Rotation, node_Scale, node_Mesh ];
    }
    
    
    
    
    
    
    
    
    function build_Materials( material_Attributes, assetManager, renderer )
    {
         // Each attribute block corresponds to a submesh inside the mesh file. Duplicate data - hurr durr.
         // The materials per submesh will be stored here
        var materialList = [];
                
        material_Attributes.forEach( function ( attributes )
        {
            var material_Variables   = attributes.get_Variables();
            var material_Description = read_Material( material_Variables );
                    
            // Each material has four textures, valid or null
            var MAX_TEXTURES         = 4;
            var textureList          = [];
            var texturePaths         = [ relative_Path( material_Description[6] ), relative_Path( material_Description[7] ), 
                                         relative_Path( material_Description[8] ), relative_Path( material_Description[9] ) ];  // Each attribute field can declare at most four textures, each for each active slot
                    
            for( var t = 0; t < MAX_TEXTURES; t++ ) 
            {
                if( texturePaths[t] == "NULL") textureList.push( new Texture( renderer.gl, "data/NULL.png", "FILTER_PLAIN" ) );  // WARNING! -> hardcoded
                else
                    textureList.push( assetManager.get( texturePaths[t] , function( renderer ,path )
                    {
                        return new Texture( renderer.gl, path, "FILTER_PLAIN" );  // Substitute PLAIN from extracted flags!
                    }));
            }
                     
            var shaderPath = "DEFAULT_SHADER";                                                      // This is a dummy "path" for now
            
            var shader     = assetManager.get( shaderPath , function( renderer , shaderPath )
            {
                var basic     =  ( typeof textureList[1] != 'undefined'                    )  ? "NORMAL"   : "NULL";
                var advanced  =  ( typeof textureList[2] != 'undefined' && basic != "NULL" )  ? "PARALLAX" : "NULL";
                
                var features = new ShaderFeatures( [basic,advanced] );
                
            return new Shader( renderer.gl  , "vertex_Shader", "pixel_Shader" , features  );                // Dummy shaders as well
            });
                    
         // Now we have... A set of meshes, a set of textures and in the future, a set of shaders. For now one will have to do.
        materialList.push( new Material( shader, textureList[0],textureList[1],textureList[2],textureList[3], "MAPPING_NORMAL" ))
        });
    
    return materialList;
    }


    function build_Meshes( meshPath, assetManager, renderer )
    {
         // Here we download a list of meshes, ignoring the infile material definitions.
        var meshList  = assetManager.get( meshPath , function( renderer , meshPath )
        {
            var meshParser  = new Parser( meshPath );
            var meshTexts   = import_MeshData( meshParser.the_Document.rawData );
            var meshes      = [];
                    
            meshTexts.forEach( function( meshData )
            {
                var vertices  = meshData[0];
                var indices   = meshData[1];
                var texCoords = meshData[2];
                var normals   = meshData[3];
                       
                meshes.push( new Mesh( renderer.gl, vertices, indices, texCoords, normals )  );
            });

        console.log("Loaded " + meshes.length + " meshes from file ");
        return meshes;
        });
        
        
    return meshList; 
    }






    Parser.prototype.parse_Scene = function( renderer, assetManager ) 
    { 
        var the_Scene                    = new Scene( renderer ); 
        var nodes                        = this.the_Document.get_Subfields("node");
      
        // For each node, we need to extract the following data...
        nodes.forEach( function( node )
        {
            var type                     = node.get_Type();
            var attributes               = node.get_Subfields("attributes");
           
            var node_Variables           = attributes[0].get_Variables();                  // There shold be only ONE per node!
            var node_Description         = read_Node( node_Variables );
                
            var node_Position            = node_Description[0].casted();
            var node_Rotation            = node_Description[1].casted();
            var node_Scale               = node_Description[2].casted();
        
          
        
            // For a node that is of type "mesh"....
            if( type == "mesh")
            {
                var node_Materials       = node.get_Subfields("materials");                 
                var material_Attributes  = node_Materials[0].get_Subfields("attributes");  // There should be exactly ONE <materials> tag per field! More -> assert fail here.
                var materialList         = build_Materials( material_Attributes, assetManager, renderer );
                var materialCount        = materialList.length; 
         
                var meshPath             = relative_Path( node_Description[3].casted() );
                var meshList             = build_Meshes( meshPath, assetManager, renderer );
                var meshCount            = meshList.length;
              
                if( meshCount != materialCount )                                         // There had better be one material available for all meshes. 1:1 not required though.
                {
                    alert(" Mesh - Material incongruity! - ABORT - ");
                }
             
                for( var i = 0; i < meshCount; i++ )
                {
                    var entity = new Entity( meshList[i], materialList[i] );
                        entity.set_Position( [             node_Position.x ,             node_Position.y , node_Position.z             ] );
                        entity.set_Rotation( [ DegToRad( node_Rotation.x ) , DegToRad( node_Rotation.y ) , DegToRad( node_Rotation.z ) ] );
                        entity.set_Scale   ( [                node_Scale.x ,                node_Scale.y , node_Scale.z                ] );         // Okay. This is just sad... I need to either overload Orientation class or swap over to Vector notation. Can't do it yet in fear of breaking something.
                    
                the_Scene.insert( entity , "DYNAMIC" );
                }
                
                
            }       
            else
                if( type == "light" )    // For a node that is of type "light"....
                {
                  
                        var variables       = attributes[0].get_Variables();     // Plz god, let the light variables be in a fixed order...
                                                                                 // IF not... Need to implement a retarded case - switch or if then else loop.
                        var lightName       = variables[0].casted();
                        var lightID         = variables[1].casted();
                        var lightPos        = variables[2].casted();
                        var lightRot        = variables[3].casted();
                        var lightScale      = variables[4].casted();
                        
                        var color_Ambient   = variables[9].casted();
                        var color_Diffuse   = variables[10].casted();
                        var color_Specular  = variables[11].casted();
                        
                        var attenuation     = variables[12].casted();
                        var radius          = variables[13].casted();
                        
                        var light           = new Light( lightPos , radius, color_Ambient, color_Diffuse, color_Specular, attenuation.x, attenuation.y, attenuation.z );
                        
                        the_Scene.insert( light , "LIGHT" );
                }
           
                
        });
        
        
        
        
        
    console.log(" Scene parsed succesfully! ");    
    alert("OK with " + the_Scene.entries_Dynamic.length + " nodes");
    return the_Scene;
    }
    
    
    
    
    
    
    
   