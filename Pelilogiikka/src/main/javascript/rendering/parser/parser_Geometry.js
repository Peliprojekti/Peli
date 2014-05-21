


    function parse_Vertex_Header( header )
    {
        var begin_Vcnt = header.indexOf('vertexCount', 0 );
        var end_Vcnt   = header.indexOf('">', begin_Vcnt )
        begin_Vcnt    += 13;                                            // HAX -> sizeof( vertexCount=" );
        var vCnt       = header.substring( begin_Vcnt,end_Vcnt);        // WTF? Miksi saatanassa se ottaa verteksikuvauksen mukaan?
        
    return [ vCnt, "unused", "unused" ];
    }

    function parse_Index_Header( header )
    {
        var begin_Icnt  = header.indexOf('indexCount', 0 );
            begin_Icnt += 12;                                        // HAX -> sizeof( indexCount=" );
        var end_Icnt    = header.indexOf('">', begin_Icnt )
        var iCnt        = header.substring( begin_Icnt,end_Icnt);        // WTF? Miksi saatanassa se ottaa verteksikuvauksen mukaan?
        
    return [ iCnt, "unused", "unused" ];
    }
    
    

    function parse_Vertex( string )     // Expected format,  X,Y,Z, I,J,K, ?,U,V
    {   
       var components = string.split(" ");
       var point      = [];
       var normal     = [];
       var uv         = [];
         
       for( var i = 0; i < 3; i++ )
       {
            point[ i ] =  parseFloat( components[ i ] ); // Points
           normal[ i ] =  parseFloat( components[3+i] ); // Normals
       }
       
       uv[ 0 ] =  parseFloat( components[7+0] ); // Texcoords
       uv[ 1 ] =  parseFloat( components[7+1] ); // Texcoords
    
    return [ point, normal, uv ];
    }


    function parse_Vertexlist( vertex_Header, lines )
    {
        var vertices = [];
 
        for( var i = 1; i <= vertex_Header[0]; i++ )               
        {
            var vertex = parse_Vertex( lines[i]);
            vertices.push( vertex );
        }
      
    return vertices;
    }
    

   
    
    function parse_Indexlist( index_Header, lines  )
    {
        // [0] is the header, skip it.
        var indices = [];
     
        for( var i = 1; i < lines.length-1; i++ )         // For each line, extract indices. -1 to remove the last dead line
        {     
             var numerals = lines[i].split(" ");          // Split each index line into tokens
       
             for( var j = 0; j < numerals.length; j++ )   // Last is NAN?  THE FUCK? Its not? Is it? -> Potential future issue here!
             {
                 var index = parseInt( numerals[j] );
                 indices.push( index );
             }
        }
           
    return indices;
    }
    
    

    function parse_Batch( batch )
    {
      // Split the vertex string into lines
      var vertex_Lines  = batch[0].toString().split("\n");
      var vertex_Header = parse_Vertex_Header( vertex_Lines[0] );
      var vertices      = parse_Vertexlist( vertex_Header, vertex_Lines );
      
      var index_Lines   = batch[1].toString().split("\n");
      var index_Header  = parse_Index_Header( index_Lines[0] );
      var indices       = parse_Indexlist( index_Header, index_Lines );
    
    return [ vertices, indices ];
    }



    function read_Batch( index, rawData )
    {
  
       var begin_Verts = rawData.indexOf("<vertices"  , index );
       
       if( begin_Verts == -1 )   return [ null, 0, null, 0 ];       // No verts - game over.
   
       var  end_Verts  = rawData.indexOf("</vertices>", begin_Verts );
       var      vData  = rawData.substring(begin_Verts, end_Verts   ); 
       var begin_Inds  = rawData.indexOf("<indices"  , end_Verts    );              
       var   end_Inds  = rawData.indexOf("</indices>", begin_Inds   );
       var      iData  = rawData.substring( begin_Inds, end_Inds    ); 
    
    return [ vData, iData, end_Inds ];      // Third index is a hax. No long term use for it!
    }





    function get_Batches( rawData )
    {
       var batches     = [];
       var index       = 0;
        
       while( true )
       {
           var batch = read_Batch( index, rawData );
               index = batch[2];                        // Keep advancing along the source string
               
           if( batch[0] != null )
                batches.push( batch );
                     else
                        return batches;
        }
    }








    function import_Irmesh( gl, fileName )
    {
       var meshList    = [];
        
       var rawData     = FileHelper.readStringFromFileAtPath ( fileName );
       var batches     = get_Batches( rawData );
       
        for( var b = 0; b < batches.length; b++ )
        {
            var batch       = parse_Batch( batches[b] );   
        
            var vertex_List = [];
            var  index_List = [];
            var normal_List = [];
            var     uv_List = [];
            var        vCnt = batch[0].length;
            var        iCnt = batch[1].length;
        
        
       
        for( var i = 0; i < vCnt; i++ )
        {
            var x = batch[0][i][0][0];
            var y = batch[0][i][0][1];
            var z = batch[0][i][0][2];
       
            var xN = batch[0][i][1][0];
            var yN = batch[0][i][1][1];
            var zN = batch[0][i][1][2];
        
            var u = batch[0][i][2][0];
            var v = batch[0][i][2][1];
            
        
            // This is probably a HAX, but until a formal solution is found, it would seem correct.
            // x *= -1;   // Flip the x-axis of the vertices local space
            v *= -1;   // Flip the v-axis of the uv space.
         
            vertex_List.push( x );    
            vertex_List.push( y );  
            vertex_List.push( z );  
            
            normal_List.push( xN );
            normal_List.push( yN );
            normal_List.push( zN );
             
            uv_List.push( u );
            uv_List.push( v );     // ATTENTION! Some confusion with UV-coords... FLIPPED V?!?! WHAT THE HELL?
        }
      
       for( var j = 0; j < iCnt; j++ )
       {
           index_List.push( batch[1][j] );
       }
            
            
       var mesh = new Mesh  ( gl, vertex_List, index_List, uv_List, normal_List );   
       meshList.push( mesh ); 
       }
       
    return meshList;
    }