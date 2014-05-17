


    // <node type="mesh">
    
    function next_MeshString( rawData, cursor )
    {
       var begin_Node = rawData.indexOf( '<node type="mesh">' , cursor );
       
       if( cursor == -1 )   return null;       
   
       var end_Node = rawData.indexOf("</node>", begin_Node );
       var string   = rawData.substring( begin_Node, end_Node ); 
    
    return [ string, end_Node ];
    }
    
    
    
    
    
    
    
    function parse_Mesh( descriptor )
    {
         //console.debug( string );
        var lines = descriptor.toString().split("\n");
        
        lines.forEach( function( token){
           
            alert( token );
        });
        
    }
    
    
    function next_Mesh( rawData, cursor )
    {
        var descriptor = next_MeshString( rawData, cursor );
        
        parse_Mesh( descriptor );
    }
    
    
    
    
    
    function import_Scene( gl, fileName )
    {
        var rawData = FileHelper.readStringFromFileAtPath ( fileName );
        
        var position;
        var orientation;
        
        rawData.forEach( function( line )
        {
            
        });
        
        
        
        next_Mesh( rawData, 0 );
        
    }