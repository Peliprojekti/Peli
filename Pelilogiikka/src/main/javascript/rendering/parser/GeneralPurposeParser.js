
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
    

    function Parser( renderer, fileName )
    {
        // Grab the file contents.
        var request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send(null);
        this.the_Document = new Field( request.responseText );
    };
       
       
       
       
       
       
       
       
       
       
       
       
       
    function perse( fileName )
    {
        alert( fileName );
        
        var parser       = new Parser( fileName );
       
        alert( parser.the_Document.rawData );
    
    }
       
       

    Parser.prototype.parse_Scene = function(  renderer  ) 
    { 
        var the_Scene = new Scene( renderer ); 
        var nodes     = this.the_Document.get_Subfields("node");
        
        
        nodes.forEach( function( node )
        {
            var type     = node.get_Type();
            var meshes   = [];
            var textures = [];
           
           
            if( type == "mesh")
            {
                 // These are the node attributes
                var attributes           = node.get_Subfields("attributes");
                var node_Variables       = attributes[0].get_Variables();                  // There shold be only ONE per node!
                var node_Description     = read_Node( node_Variables );
                var meshPath             = node_Description[3];
                    
                // THIS IS FUCK
                perse( fix_ResourcePath( meshPath ) );
            
                var node_Materials       = node.get_Subfields("materials");                 // There shold be only ONE per node!
                var material_Attributes  = node_Materials[0].get_Subfields("attributes");   // There shold be only ONE per node!
                var material_Variables   = material_Attributes[0].get_Variables();
                var material_Description = read_Material( material_Variables );
            }
            else
                if( type == "light" )
                {
                    // Read and insert lights here
                    node.report();
                }
        });
        
    alert(" Scene parsed! ");    
    return the_Scene;
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
        
        var ret = [];
            ret.push( node_Position.casted() );
            ret.push( node_Rotation.casted() );
            ret.push( node_Scale.casted()    );
            ret.push( node_Mesh.value        );
    
        
    return  ret;
    }
    
    
    
    
    function read_Material( material_Variables )
    {
            var material_Ambient;
            var material_Diffuse;
            var material_Specular;
            var material_Shine;
            
            var material_Param1;
            var material_Param2;
            
            var material_Texture1;
            var material_Texture2;
            var material_Texture3;
            var material_Texture4;
              
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
    
   