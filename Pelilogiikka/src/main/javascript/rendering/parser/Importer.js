


    // <node type="mesh">
    
    function next_NodeString( rawData, cursor )
    {
       var begin_Node = rawData.indexOf( '<node type="mesh">' , cursor );
       
       if( cursor == -1 )   return null;       
   
       var end_Node = rawData.indexOf("</node>", begin_Node );
       var string   = rawData.substring( begin_Node, end_Node ); 
    
    return [ string, end_Node ];
    }
    
    
    
    
    
    
    
    function parse_Node( descriptor )
    {
         //console.debug( string );
        var lines = descriptor.toString().split("\n");
       
        var meshName;
        var position   = [];
        var rotation   = [];
        
        
        var statusFlag = "UNKNOWN"
        
        
        lines.forEach( function( line )
        {
            if( line.indexOf("<attributes>") > -1 )
            {
                statusFlag = "MESH";
                return;
            }
           
            if( line.indexOf("<materials>") > -1 )
            {
                statusFlag = "MATERIALS";
                return;
            }
            
            // This line contains orientational or positional data
            if( line.indexOf( "<vector3d" ) > -1 )  
            {
                var index = line.indexOf('name="Position" value="'); // +22 
                
                if( index > -1 ) 
                {
                   index += 23;
                   var data = line.substring( index, line.length-5 );   // Ignore the />
                   var tokens = data.split( ",");
                   position =  [ parseFloat( tokens[0] ) ,  parseFloat( tokens[1] ) , parseFloat( tokens[2]) ];
                }
                
                index = line.indexOf('name="Rotation" value=');
                    
                if( index > -1 )
                {
                   index += 23;
                   var data = line.substring( index, line.length-5 );   // Ignore the />
                   var tokens = data.split( ",");
                   rotation =  [ parseFloat( tokens[0] ) ,  parseFloat( tokens[1] ) , parseFloat( tokens[2]) ];
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
                    }
                    
                    index = line.indexOf('name="Name" value="'); // +19 
                      
                    if( index > -1 )     // Contains the name of the node
                    {
                        ("LOL");
                    }
                }   
        });
     
        
    return [ meshName, position, rotation ];
    }
    
    
    
    
    
    
    function next_Node( rawData, cursor )
    {
        var descriptor = next_NodeString( rawData, cursor );
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
        var texture  = new Texture( gl , "data/texture.png" , "FILTER_FANCY"  );  
        var shader   = new  Shader( gl , "vertex_Shader", "pixel_Shader"      );
        var material = new Material( shader, texture );
        
        var meshName = node_Descriptor[0];
        var position = node_Descriptor[1];
        var rotation = node_Descriptor[2];
        
        var mesh     = import_Irmesh( gl, fix_ResourcePath( meshName ) );
           
        var entityList = [];
        
        mesh.forEach( function( item )
        {
            var entity = new Entity( item, material );
            entityList.push( entity );
        });
        
    return entityList;
    }
    
    
    function import_Scene( renderer, fileName )
    {
        var scene = new Scene( renderer );
        var    gl = renderer.gl;
        
        var rawData = FileHelper.readStringFromFileAtPath ( fileName );
        var cursor  = 0;
        
        var descriptor = next_Node( rawData, cursor    );
        var       node = build_Node( gl, descriptor[0] );
        
        node.forEach( function( item )
        {
            scene.insert( item , "DYNAMIC" );
        });
        
       
        
    return scene;
    }