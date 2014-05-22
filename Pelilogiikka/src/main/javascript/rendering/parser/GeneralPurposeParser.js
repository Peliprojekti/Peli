
    function Field( data, label )
    {
        this.rawData = data;
        this.label   = label;
    }
    
    Field.prototype.report =  function()
    {
        alert( this.rawData );
    }
    
    function Attribute( data )
    {
        this.rawData = data;
    }
    
    Attribute.prototype.report =  function()
    {
        alert( this.rawData );
    }
    
       
    function Variable( label, value )
    {
        this.label = label;
        this.value = value;
    }
    
    Variable.prototype.report =  function()
    {
        alert( this.label + " = "+ this.value );
    }
    




    function Record()
    {
        this.name   = null;
        this.values = [];
    }
    
    
  
    
    function Parser( fileName )
    {
        // Grab the file contents.
        var request = new XMLHttpRequest();
        request.open("GET", fileName, false);
        request.send(null);
        var rawData = request.responseText;
       
        this.parse_Mesh( new Field( rawData ) );
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
        
        var stringIndex  = '<'+field.label+'>'.length;  //field.rawData.indexOf( '<'+field.label+'>'  , stringIndex   );
           
        
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
        var mesh                 = this.get_Fields     ( "mesh"        , the_Document   ); 
      
        var mesh_Box             = this.get_Attributes ( "boundingBox" , mesh[0]        );
        var mesh_Materials       = this.get_Fields     ( "material"    , mesh[0]        );
        var mesh_Buffers         = this.get_Fields     ( "buffer"      , mesh[0]        );
      
        var mesh_Buffer_vertices = this.get_Attributes( "vertices"    , mesh_Buffers[0] );
        var mesh_Buffer_indices  = this.get_Attributes( "indices"     , mesh_Buffers[0] );

        var materials            = this.parse_Materials( mesh_Materials[0] );
     
    alert(" OVER & OUT ");
    }
    
    
    Parser.prototype.parse_Materials = function( field )
    {
       //var colorData = this.get_Attributes( "color", field );
      
      // var v1 = this.get_Variable( colorData[0] );
        //   v1.report();
        
        var variables = this.get_Variables( field );
        
        
        variables.forEach( function( variable )
        {
           variable.report(); 
        });
         
    }
    