
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
          
            ret.push( material_Texture1.value                );
            ret.push( material_Texture2.value                );
            ret.push( material_Texture3.value                );
            ret.push( material_Texture4.value                );
         
    return ret;
    }
    
    
    function build_Materials( attributes )
    {
        var MAX_TEXTURES = 4;       // The editor simply will not output more in its datasheet...
        var materialList = [];
                
        attributes.forEach( function ( attributes )
        {
            var variables    = attributes.get_Variables();
            var description  = read_Material( variables );
            
            var textureList  = [];
            var texturePaths = [ relative_Path( description[0] ) , relative_Path( description[1] ), 
                                 relative_Path( description[2] ) , relative_Path( description[3] ) ];  
            
            for( var t = 0; t < MAX_TEXTURES; t++ ) 
            {
                if( texturePaths[t] == "NULL") textureList.push( new Texture( "/data/NULL.png" ) );  
                else
                    textureList.push( new Texture( texturePaths[t] ) );
            }
            
        materialList.push( new Material( textureList[0], textureList[1], textureList[2], textureList[3] ) );
        });
    
    return materialList;
    }
    
    
    
    