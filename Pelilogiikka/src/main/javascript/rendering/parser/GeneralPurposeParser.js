


        
        
    function DataSheet()
    {
    };
    
    DataSheet.prototype.push = function( )
    {
        
    }


    
    
    
    
    
    
    function GeneralPurposeParser( fileName, fetch_Array )
    {   
        // First, load the file and store its contents locally as a string.
        var request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send(null);
        
        if( request.responseXML == null ) throw "Parsing error - Null response."
        
        this.xmlDoc = request.responseXML;
    }
    
            


    // -300.000000 -52.500000 -210.000000 0.000000 1.000000 0.000000 ffffffff 0.000000 0.000000
    //  var data  = xmlDoc.getElementsByTagName("vertices")[0].childNodes[0].nodeValue;
     

    GeneralPurposeParser.prototype.fetch_Element = function( label, elementSize, initializer ) 
    {  
        
        var data     = this.xmlDoc.getElementsByTagName(label)[0].childNodes[0].nodeValue;
     
        console.log( data );
       
        
        /*
        for( var i = 0; i < tokens.length/elementSize; i += elementSize )
        {
            var batch = [];
            
            for( var j = 0; j < elementSize-1; j++ )
            {
                batch.push( tokens[i+j] );
            }
            
            retData.push( initializer( batch ) );
          
      //   alert("Line: " + a + " , " + b + " , " +c );
        }
      
    return retData;
    */
    }
    
 