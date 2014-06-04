
    function relative_Path( full_Path )
    { 
        var clip = full_Path.indexOf( "data" );
        if( clip == -1 ) return "NULL";
        return  full_Path.substring( clip, full_Path.length );
    }
    
    function Parser( fileName )
    {
        console.log("Accesssing " + fileName );
        
        var request = new XMLHttpRequest();
            request.open("GET", fileName, false);
            request.send( null);

    this.the_Document = new Field( request.responseText );
    }

    function Field( data, label )
    {
        this.rawData = data;
        this.label   = label;
        this.type    = "NULL";
    }
    
    Field.prototype.report =  function()
    {
        alert( this.rawData );
    }
    
    Field.prototype.get_Subfields = function( tag )
    {
        var retArray    = [];
        var stringIndex = 0;
        
        while( true )
        {
            var first_Line = this.rawData.indexOf( "<"+tag  ,    stringIndex );
            var last_Line  = this.rawData.indexOf( "</"+tag+">", first_Line  );
            
            if( first_Line == -1  )  
                return retArray;
             
            if( last_Line == -1 )
            alert("FUBAR");//    throw new Exception( Exception.Type.INVALID, "GPP - Bad Interval: " + first_Line + " , " + last_Line );
             
        retArray.push( new Field(  this.rawData.substring( first_Line, last_Line ), tag ) );
        stringIndex = last_Line;
        }
    }
    
    
    Field.prototype.get_Variables = function()
    {
        var retArray         = [];
        var repeats          = this.rawData.split("\n").length;
            repeats         -= 2; // Skip the <tag> line at the start as well as </tag> line at the end
        
        var stringIndex      = '<'+this.label+'>'.length;
            stringIndex     += '<attributes> \n'.length;  //field.rawData.indexOf( '<'+field.label+'>'  , stringIndex   );
        
        for( var i = 0; i < repeats; i++ )
        {
            var label_Begin  = this.rawData.indexOf( 'name="'  , stringIndex   );
            var type_Begin   = stringIndex + '" />'.length;
            var type_End     = label_Begin;
            var type         = this.rawData.substring( type_Begin, type_End  );
            
            label_Begin     += 'name="'.length;
            
            var label_End    = this.rawData.indexOf( '"'       , label_Begin   );
            var value_Begin  = this.rawData.indexOf( 'value=' ,  stringIndex   );
            
            value_Begin     += 'value="'.length;
            
            var value_End    = this.rawData.indexOf( '"'      , value_Begin    );
            var label        = this.rawData.substring( label_Begin, label_End  );
            var value        = this.rawData.substring( value_Begin, value_End  );
             
            retArray.push( new Variable(  label,  value, type ) );
            stringIndex = value_End;
        }
     
    return retArray;
    }
    
    
    
    Field.prototype.get_Attributes = function( tag )
    {
        var retArray    = [];
        var stringIndex = 0;
        
        while( true )
        {
             var first_Line = this.rawData.indexOf( "<"+tag  , stringIndex );
             var last_Line  = this.rawData.indexOf( "/>"     , first_Line  );
        
            if( first_Line == -1  )
                return retArray;
            
            if( last_Line == -1 )
            {
                last_Line = this.rawData.indexOf( "</"+tag+">",   first_Line );
         
                if( last_Line == -1 ) 
                    throw new Exception( Exception.Type.MISMATCH , "GPP - Opening " + "<"+tag+ " found but failed to terminate!: " + tag );
            }
   
        retArray.push( new Attribute(  this.rawData.substring( first_Line, last_Line ) ) );
        stringIndex = last_Line;
        }
    }
    
    
    Field.prototype.get_Type = function( tag )
    {
        if( this.type == "NULL")
        {
            var begin  = this.rawData.indexOf( '="' , 0    );
                begin += '="'.length;
            var end    = this.rawData.indexOf( '"'      , begin );
            this.type  = this.rawData.substring( begin, end );
        }
        
    return this.type;
    }
    
//////////////////////////////   
    
    function Attribute( data )
    {
        this.rawData = data;
    }
    
    Attribute.prototype.alert =  function()
    {
        alert( this.rawData );
    }

//////////////////////////////        
       
    function Variable( label, value, type )
    {
        this.label = label.trim();  
        this.value = value.trim();  
        this.type  = type.trim();       
    }
    
    Variable.prototype.alert =  function()
    {
        alert( this.label + " = "+ this.value );
    }
    
    Variable.prototype.casted  = function()
    {
        switch( this.type ) 
        {
            case "<int"      : return   parseInt( this.value );
            case "<float"    : return parseFloat( this.value );
            case "<bool"     : if( this.value == "true"){  return true; } else return false;
            
            case "<vector3d" : var values = this.value.split(" ");  
                               return  new Vector3( parseFloat( values[0] ), parseFloat( values[1] ) , parseFloat( values[2] ) );
        
            case "<colorf"   : var values = this.value.split(" "); 
                               return new Vector3( parseFloat( values[0] ), parseFloat( values[1] ) , parseFloat( values[2] ) );                   
        
            case  "<color"   : return   parseInt( this.value );
            
            case "<string"   : return this.value;
            case "<texture"  : return this.value;
            case "<enum"     : return this.value;
        }
        
    return "NULL";
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
    
    }
    
    
    
    
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

       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
   /* 
    
   
    



//   -240.000000 -45.000000 -210.000000 
//    0.000000 1.000000 0.000000 
//    ffffffff 
//    0.000000 0.000000 
//    1.000000 0.000000 0.000000 
//    0.000000 0.000000 -1.000000

    function build_Meshes( meshPath, assetManager, renderer )
    {    
        var meshList      = [];
        var vertexData    = []; 
        var indexData     = [];
        
        var meshParser  = new Parser( meshPath );
        
        var fields = meshParser.the_Document.get_Subfields( "indices" );
        
        
        fields.forEach( function( field )           
        {
            var lines   = field.rawData.split("\n");
            var indices = [];
            
            for( var t = 1; t < lines.length; t++ )     // Skip over the header [0]
            {
                var tokens  = lines[t].split(" ");
                 
                for( var i = 0; i < tokens.length; i++ )  // Skip the header 
                {
                    var index = parseInt( tokens[i] );
                    indices.push( index );
                }
            }   
           
           
        indexData.push( indices );
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
                
                positions.push( x );
                positions.push( y );
                positions.push( z );
                
                texCoords.push( u );
                texCoords.push( -v );       // Negate V to accomodate handedness shift
                
                normals.push( nX );
                normals.push( nY );
                normals.push( nZ );
               
                binormals.push( bX );
                binormals.push( bY );
                binormals.push( bZ );  // Flip the binormal attribute or not?
                
                tangents.push( tX );
                tangents.push( tY );
                tangents.push( tZ );
                
            }
                                       
            var mesh   = new Mesh( renderer.gl, positions, indexData[f], texCoords, normals, binormals, tangents ); 
            meshList.push( mesh );
        }
        
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
            
            if( type == "path" )
            {
                alert( "path found!");
                return;
            }
            
            
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
    //alert("OK with " + the_Scene.entries_Dynamic.length + " nodes");
    return the_Scene;
    }
    
    
    
    
    
    
  ///////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////PROTOTYPE PARSER STARTS HERE ////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////  
    
   
   
   
   
   
   
    Parser.prototype.parse_Scene_Advanced = function( renderer, assetManager ) 
    { 
        var the_Scene                    = new Scene( renderer ); 
        var nodes                        = this.the_Document.get_Subfields("node");
        
        var rawMeshes_List               = [];  // This is where all the mashes will end up before being processed
        var orientations_List            = [];
       
      

        // For each node, we need to extract the following data...
        nodes.forEach( function( node )
        {
            var type                     = node.get_Type();
            var attributes               = node.get_Subfields("attributes");
            var node_Variables           = attributes[0].get_Variables();                  // There shold be only ONE per node!
            var node_Description         = read_Node( node_Variables );
                
            var node_Position            = node_Description[0].casted();
            var node_Scale               = node_Description[2].casted();
            var node_Rotation            = node_Description[1].casted();
            
            // Convert the rotation into radians.
            node_Rotation.x = DegToRad( node_Rotation.x );
            node_Rotation.y = DegToRad( node_Rotation.y );
            node_Rotation.z = DegToRad( node_Rotation.z );
            

            // For a node that is of type "mesh"....
            if( type == "mesh")
            {
                var meshPath             = relative_Path( node_Description[3].casted() );
                var node_Materials       = node.get_Subfields("materials");                 
                var material_Attributes  = node_Materials[0].get_Subfields("attributes");  // There should be exactly ONE <materials> tag per field! More -> assert fail here.
                
                var materials            = build_Materials( material_Attributes, assetManager, renderer );
                var rawMeshes            = build_Rawmeshes( meshPath, materials );
                
                var orientation          = new Orientation( [ node_Position.x, node_Position.y, node_Position.z ] ,
                                                            [    node_Scale.x,    node_Scale.y,    node_Scale.z ] , 
                                                            [ node_Rotation.x, node_Rotation.y, node_Rotation.z ] );
                
            
                
                orientations_List.push( orientation );
                   rawMeshes_List.push( rawMeshes   );
            }       
            else
                if( type == "light" )    // For a node that is of type "light"....
                {
                    var variables       = attributes[0].get_Variables();     // Plz god, let the light variables be in a fixed order...
                    var light           = load_Light( variables );           
                    the_Scene.insert( light , "LIGHT" );
                }
                
        });
        
        
        
      console.log(" Scene extracted - baking a triangle mash ");    
    
      compose_WorldMesh( rawMeshes_List , orientations_List )
 
    return the_Scene;
    }
    
   
   
   
  
   
   
   
   
   
   // IF not... Need to implement a retarded case - switch or if then else loop.
    function load_Light( variables ) 
    {
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
  
    return new Light( lightPos , radius, color_Ambient, color_Diffuse, color_Specular, attenuation.x, attenuation.y, attenuation.z );
    }
*/   