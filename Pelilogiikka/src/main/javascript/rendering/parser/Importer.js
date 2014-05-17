


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
    
    
    
    
    
    function build_Node( node_Descriptor )
    {
        
       // data[0];
       // cursor = data[1];
        
    }
    
    
    function import_Scene( gl, fileName )
    {
        var rawData = FileHelper.readStringFromFileAtPath ( fileName );
        
        var cursor = 0;
        
        var descriptor = next_Node( rawData, cursor );
        var       node = build_Node( descriptor );
        
        
         
        alert("Manifest position " + node[1][0] + " : " + node[1][1] + " : " + node[1][2] );
        alert("Manifest rotation " + node[2][0] + " : " + node[2][1] + " : " + node[2][2] );
        alert("Manifest mesh     " + node[0]);    
        
        
    }