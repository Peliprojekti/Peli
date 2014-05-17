

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
    };
}
