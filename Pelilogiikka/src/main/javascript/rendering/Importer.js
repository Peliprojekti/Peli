

// Funktio p�llitty t��lt�: http://stackoverflow.com/questions/13709482/how-to-read-text-file-in-javascript
// Jos joku tiet�� paremman keinon, kertokaa toki!
// T�rkeint� nyt kuitenkin saada Editori -> Export -> Import -> Engine ketju jotenkin kasaan!
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





function import_Mesh( fileName )
{
    var rawData  = FileHelper.readStringFromFileAtPath ( fileName );
    var tokens   = rawData.split(" ");
    
    tokens.forEach( function( entry )
    {
         console.log( entry );  
    });
    
    
}

