


    
    
    
    
    function parse_Node( descriptor )
    {
         //console.debug( string );
        var lines = descriptor.toString().split("\n");
       
        var meshName;
        var textures   = [];
        var position   = [];
        var rotation   = [];
        var scale      = [];
        
        
       
        lines.forEach( function( line )
        {
            // Only one texture for now!
            var index = line.indexOf('<texture name="Texture1" value="')
            
            if( index > -1 )
            {
                var texRef = line.substring( index+32, line.length-5 );   // Ignore the />  and +32 from the string. NEED a better solution ffs!
                textures.push( texRef );
              //  alert(" TEXTURE FOUND " + texRef );   
                return;
            }
            
            // This line contains orientational or positional data
            if( line.indexOf( "<vector3d" ) > -1 )  
            {
                index = line.indexOf('name="Position" value="'); // +22 
                
                if( index > -1 ) 
                {
                   index += 23;
                   var data = line.substring( index, line.length-5 );   // Ignore the />
                   var tokens = data.split( ",");
                   position =  [ parseFloat( tokens[0] ) ,  parseFloat( tokens[1] ) , parseFloat( tokens[2]) ];
                   return;
                }
                
                index = line.indexOf('name="Rotation" value=');
                    
                if( index > -1 )
                {
                   index += 23;
                   var data = line.substring( index, line.length-5 );   // Ignore the />
                   var tokens = data.split( ",");
                   rotation =  [ parseFloat( tokens[0] ) ,  parseFloat( tokens[1] ) , parseFloat( tokens[2]) ];
                   return;
                }
                
                index = line.indexOf('name="Scale" value=');
                    
                if( index > -1 )
                {
                   index += 20;
                   var data = line.substring( index, line.length-5 );   // Ignore the />
                   var tokens = data.split( ",");
                   scale =  [ parseFloat( tokens[0] ) ,  parseFloat( tokens[1] ) , parseFloat( tokens[2]) ];
                   return;
                }
                
                
                
            }
            else
                if( line.indexOf( "<string" ) > -1 )
                {
                    var index = line.indexOf('name="Mesh" value="'); // +19 
                       
                    if( index > -1 )     // Contains the mesh reference
                    {
                        index   += 19;
                        meshName = line.substring( index, line.length-5 );   // Ignore the />
                        return;
                    }
                    
                    index = line.indexOf('name="Name" value="'); // +19 
                      
                    if( index > -1 )     // Contains the name of the node
                    {
                        return;
                    }
                }   
     
         
            
        });
     
     
     
        
    return [ meshName, textures, position, rotation, scale ];
    }
    
      
    function next_NodeString( rawData, cursor )
    {
       var begin_Node = rawData.indexOf( '<node type="mesh">' , cursor );
       
       if( begin_Node <= -1 )   return null;     
   
       var end_Node = rawData.indexOf("</node>", begin_Node );
       var string   = rawData.substring( begin_Node, end_Node ); 
    
    return [ string, end_Node ];
    }
    
    
    
    
    
    function next_Node( rawData, cursor )
    {
        var descriptor = next_NodeString( rawData, cursor );
        
        if( descriptor == null )
        {
            alert("Null descriptor at " + cursor );
           return [null,null];
        }
        
        var node       =  parse_Node( descriptor );
    
    return [ node, descriptor[1] ];
    }
    
    
    
    function fix_ResourcePath( full_Path )
    {
        var clip = full_Path.indexOf( "data" );
        return  full_Path.substring( clip, full_Path.length );
    }
    
   
    
    function build_Node( gl, node_Descriptor )
    {
        var meshName = node_Descriptor[0];
        var textures = node_Descriptor[1];
        var position = node_Descriptor[2];
        var rotation = node_Descriptor[3];
        var scale    = node_Descriptor[4];
        
        var mesh     = import_Irmesh( gl, fix_ResourcePath( meshName ) );
           
        var entityList = [];
        
        var index = 0;
        
        mesh.forEach( function( item )
        {
            var texName = fix_ResourcePath( textures[ index++ ]);
            
            alert( texName );
            
            var texture  = new  Texture( gl    , texName        , "FILTER_FANCY"  );  
            var shader   = new   Shader( gl    , "vertex_Shader", "pixel_Shader"  );
            var material = new Material( shader, texture                          );
            
          //  alert( texName );
          //  alert( position );
            var entity = new Entity( item, material );
                entity.set_Position( position  );
                entity.set_Rotation( rotation  );
                entity.set_Scale   ( scale     );
                
        entityList.push( entity );
        });
        
    return entityList;
    }
    
    
    function import_Scene( renderer, fileName )
    {
        var   scene = new Scene( renderer );
        var      gl = renderer.gl;
        var rawData = FileHelper.readStringFromFileAtPath ( fileName );
        var  cursor = 0;
        
        for( var i = 0; i < i+1; i++ )  // Infinite loop here. Indexed to keep track of nodes. Terminates on  descriptor[0] == null.
        {
            var descriptor = next_Node( rawData, cursor    );
            
            if( descriptor[0] == null) 
            {  
                alert("Broke after " + i + " objects");
                return scene;
            }
            
            var       node = build_Node( gl, descriptor[0] );
                    cursor = descriptor[1];
              
            node.forEach( function( subnode )
            {
                scene.insert( subnode , "DYNAMIC" );
            });
        
      //  alert("Inserted node " + i );
        }
    
    
    return scene;
    }