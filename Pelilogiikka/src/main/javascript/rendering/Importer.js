

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


   


function import_Mesh( gl, fileName )
{
    var rawData  = FileHelper.readStringFromFileAtPath ( fileName );
    var tokens   = rawData.split(" ");
    
    var indices    = [];
    var vertices   = [];    // MISNOMER! THESE ARE _VERTEX ELEMENTS_! Sets of THREE form a vertex!
    var texCoords  = [];
    var pState     = "NULL";
    

    tokens.forEach( function( entry )
    {
        
        if( pState == "V1" ) 
        {  
            var v = parseFloat( entry );
            console.log("BEGIN VERTEX \n "+v);
            vertices.push( v );
            pState = "V2";
            return;
        }
        
        if( pState == "V2" )
        {   
            var v = parseFloat( entry );
            console.log( v );
            vertices.push( v );
            pState = "V3";
            return;
        }
       
        if( pState == "V3" )
        {
            var v = parseFloat( entry );
            console.log( v + " \n END VERTEX" );
            vertices.push( v );
            pState = "NULL";
            return true;
        }
       
         
        if( pState == "T1" ) 
        {
            var t = parseFloat( entry );
            console.log("BEGIN UV "+t );
            texCoords.push( t );
            pState = "T2";
            return;
        }
        
        if( pState == "T2" )
        {  
            var t = parseFloat( entry );
            console.log( t + " END UV" );
            texCoords.push( t );
            pState = "NULL";
            return;
        }
        
        
        
        if( entry == "g" )                          // Start of a file
        {
            console.log( "NEW FILE " + entry ); 
            pState = "NEW_FILE";
            return;
        }
        
        
        if( pState == "NEW_FILE")                   // New vertex group
        {
            console.log( "NEW GROUP " + entry ); 
            pState = "NEW_VERTEX";
            return;
        }
        
        if( entry == "\nv" )
        {
            pState = "V1";
            return;
        }
        
        if( entry == "\nvt" )
        {
            console.log( "NEW TEXCOORD " + entry );   // New texcood declared
            pState = "T1";
            return;
        }
        
        if( entry == "\nEND")
        {
            console.log(" DONE LOADING ");
        }
        
    });
    
        var pCnt   = vertices.length;
        var tCnt   = texCoords.length;
        var vCnt   = vertices.length/3;
 
    
        alert( "pItems  "+ pCnt + " -> vCnt  "+ vCnt +" &  uvItems: " + tCnt );
    
    
        var mesh = new Mesh( gl, vertices, indices, texCoords );

    return mesh;
    }




    function import_Irmesh( gl, fileName )
    {
     var rawData  = FileHelper.readStringFromFileAtPath ( fileName );
     var tokens   = rawData.split(" ");
    
        var indices    = [];
        var vertices   = [];    // MISNOMER! THESE ARE _VERTEX ELEMENTS_! Sets of THREE form a vertex!
        var texCoords  = [];
        var pState     = "NULL";
        
        for( var i = 0; i < 10; i++ )
        {
           console.log( tokens[i] );
        }
        
        
    }