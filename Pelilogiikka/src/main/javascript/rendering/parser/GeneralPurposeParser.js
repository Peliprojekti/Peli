
    function Parser( fileName )
    {
        // Grab the file contents.
        var request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send(null);
        this.parse_Mesh( new Field( request.responseText ) );
    };
       


    Parser.prototype.get_Fields = function( tag, field )
    {
        var retArray    = [];
        var stringIndex = 0;
        
        while( true )
        {
            var first_Line = field.rawData.indexOf( "<"+tag  ,    stringIndex );
            var last_Line  = field.rawData.indexOf( "</"+tag+">", first_Line  );
            
             if( first_Line == -1  )
             {
                return retArray;
             }
             
             if( last_Line == -1 )
             {
                throw "Bad Interval: " + first_Line + " , " + last_Line;
             }
            
        retArray.push( new Field(  field.rawData.substring( first_Line, last_Line ), tag ) );
        stringIndex = last_Line;
        }
        
    }

    // These are peculiar... Need to figure out whether to parse them as special variables. Stupid syntax.
    Parser.prototype.get_Attributes = function( tag, field )
    {
        var retArray    = [];
        var stringIndex = 0;
        
        while( true )
        {
        
             var first_Line = field.rawData.indexOf( "<"+tag  , stringIndex );
             var last_Line  = field.rawData.indexOf( "/>"     , first_Line  );
        
        
            if( first_Line == -1  )
            {
                return retArray;
            }

            if( last_Line == -1 )
            {
                last_Line  = field.rawData.indexOf( "</"+tag+">",   first_Line );
         
                if( last_Line == -1 ) 
                {
                    throw "Opening " + "<"+tag+ " found but failed to terminate!: " + tag;
                }
            }
   
   
        retArray.push( new Attribute(  field.rawData.substring( first_Line, last_Line ) ) );
        stringIndex = last_Line;
        }
    }

    Parser.prototype.get_Variables = function( field )
    {
        var retArray    = [];
       
        alert( field.rawData );
        var repeats = field.rawData.split("\n").length;
            repeats -= 2; // Skip the <tag> line at the start as well as </tag> line at the end
        
        var stringIndex  = '<'+field.label+'>'.length;  
           
        
        for( var i = 0; i < repeats; i++ )
        {
            var label_Begin  = field.rawData.indexOf( 'name="'  , stringIndex   );
                label_Begin += 'name="'.length;
            
            var label_End    = field.rawData.indexOf( '"'       , label_Begin   );
             
            var value_Begin  = field.rawData.indexOf( 'value=' ,  stringIndex   );
                value_Begin += 'value="'.length;
            
            var value_End    = field.rawData.indexOf( '"'      , value_Begin    );
         
            var label        = field.rawData.substring( label_Begin, label_End  );
            var value        = field.rawData.substring( value_Begin, value_End  );
             
            retArray.push( new Variable(  label,  value ) );
            stringIndex = value_End;
        }
     
    return retArray;
    }




     // Extract high level blocks
    Parser.prototype.parse_Mesh = function(  the_Document  ) 
    { 
        var mesh                 = the_Document.get_Subfields( "mesh" );
        var mesh_Box             = mesh[0].get_Attributes( "boundingBox");
        var mesh_Materials       = mesh[0].get_Subfields("material");
        var mesh_Buffers         = mesh[0].get_Subfields("buffer");        
        var mesh_Buffer_vertices = mesh_Buffers[0].get_Attributes( "vertices" );
        var mesh_Buffer_indices  = mesh_Buffers[0].get_Attributes( "indices"  );
        
        
        var material_Variables   = [];
        
        /*
        
        mesh_Materials.forEach( function( field )
        {
            material_Variables.push( field.get_Variables() );
        });
        */
    
        
        
        
       var materials            = this.parse_Materials( mesh_Materials );
     
     
    alert(" OVER & OUT ");
    }
    
    
    Parser.prototype.parse_Materials = function( fields )
    {
        var retArray = [];
     
        for( var i = 0; i < fields.length; i++ )
        {
            fields[i].report();
            retArray.push( this.get_Variables( fields[i] ) );
        }
      
         
    return retArray;
    }
    