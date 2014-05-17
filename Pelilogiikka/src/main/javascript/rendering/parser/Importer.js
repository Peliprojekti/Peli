

// Funktio pöllitty täältä: http://stackoverflow.com/questions/13709482/how-to-read-text-file-in-javascript
// Jos joku tietää paremman keinon, kertokaa toki!
// Tärkeintä nyt kuitenkin saada Editori -> Export -> Import -> Engine ketju jotenkin kasaan!
function FileHelper( pathOfFileToReadFrom )
{}
{
    FileHelper.readStringFromFileAtPath = function(pathOfFileToReadFrom)
    {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;
        return returnValue;
    }
}






 // Expected format,  X,Y,Z, I,J,K, ?,U,V
    
    function parse_Vertex( string )
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
       
       for( var i = 0; i < 2; i++ )
       {
              uv[ i  ] =  parseFloat( components[7+i] ); // Texcoords
       }
    
    return [ point, normal, uv ];
    }




    function parse_Vertexlist( vertex_Header, lines )
    {
        var vertices = [];
     
        // Grab vertices
        for( var i = 1; i < vertex_Header[0]; i++ )               
        {
            var vertex = parse_Vertex( lines[i]);
            vertices.push( vertex );
        }
      
    return vertices;
    }
    
    
    
    function parse_Indexlist( index_Header, lines  )
    {
        //alert( "INDEX LINES: " + index_Header );
        
        var start = index_Header[0];
        var  end  = index_Header[1];
        alert("Index starts: " + start + " as : " + lines[start]);
           
        
    }





    function parse_Vertex_Header( header )
    {
        var begin_Vcnt = header.indexOf('vertexCount', 0 );
        var end_Vcnt   = header.indexOf('">', begin_Vcnt )
        begin_Vcnt    += 13;                                            // HAX -> sizeof( vertexCount=" );
        var vCnt       = header.substring( begin_Vcnt,end_Vcnt);        // WTF? Miksi saatanassa se ottaa verteksikuvauksen mukaan?
        
    return [ vCnt, "unused", "unused" ];
    }

    function parse_Index_Header( header, starts_At, ends_At )
    {
       // alert( header );
       
        var begin_Icnt = header.indexOf('indexCount', 0 );
        var end_Icnt   = header.indexOf('">', begin_Icnt )
          begin_Icnt  += 12;                                            // HAX -> sizeof( indexCount=" );
        var iCnt       = header.substring( begin_Icnt,end_Icnt);        // WTF? Miksi saatanassa se ottaa verteksikuvauksen mukaan?
        
    return [ iCnt, starts_At, ends_At ];
    }
   




    function parse_Batch( batch )
    {
      
        /*
      var lines          = batch.toString().split("\n");
   
      var vertex_Header  = parse_Vertex_Header( lines[0]  );                              // Any point in having this?
      var index_Starts   = (1 + parseInt(vertex_Header[0]));
      var index_Header   = parse_Index_Header (  lines[ index_Starts ], index_Starts  );  // 0 is the vertex header. 1 line per vertex definition. -> 1 + vertex_Header[0] lines?
      
      var vertices       = parse_Vertexlist( vertex_Header, lines );
      var indices        = parse_Indexlist (  index_Header, lines );
      
    return [ vertices, indices ];
    */
   return null;
    }








    function read_Batch( index, rawData )
    {
  
       var begin_Verts = rawData.indexOf("<vertices"  , index );
       
       if( begin_Verts == -1 )   return [ null, 0, null, 0 ];       // No verts - game over.
   
       var  end_Verts  = rawData.indexOf("</vertices>", begin_Verts );
       var      vData  =  rawData.substring(begin_Verts, end_Verts); 
  
       var begin_Inds  = rawData.indexOf("<indices"  , end_Verts  );              
       var   end_Inds  = rawData.indexOf("</indices>", begin_Inds );
       var      iData  = rawData.substring( begin_Inds, end_Inds  ); 
    
    return [ vData, iData ];
    }


    function get_Batches( rawData )
    {
       var batches     = [];
       var index       = 0;
        
       while( true )
       {
           var batch = read_Batch( index, rawData );
               index = batch[3];
               
           if( batch[0] != null )
                batches.push( batch );
                     else
                        return batches;
        }
    }







    function import_Irmesh( gl, fileName )
    {
        var rawData  = FileHelper.readStringFromFileAtPath ( fileName );
        var batches  = get_Batches( rawData );
        
  //      alert( batches[0][0]);
    //    alert( batches[0][2]);
        
        var batch    = parse_Batch( batches[0] );   
        
    }