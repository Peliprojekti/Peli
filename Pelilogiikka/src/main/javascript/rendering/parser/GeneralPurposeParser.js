
    function relative_Path( full_Path )
    { 
        var clip = full_Path.indexOf( "data" );
        if( clip == -1 ) return "NULL";
        var string = "/" + full_Path.substring( clip, full_Path.length ).replace(/\\/g, '/');

        return string;
    }
    
    function Parser( fileName )
    {
        console.log("Accesssing " + fileName );
        
        var request = new XMLHttpRequest();
            request.open("GET", fileName, false);
            request.send( null);

    this.the_Document = new Field( request.responseText );
    }

    function Field( data, label )
    {
        this.rawData = data;
        this.label   = label;
        this.type    = "NULL";
    }
    
    Field.prototype.report =  function()
    {
        alert( this.rawData );
    }
    
    Field.prototype.get_Subfields = function( tag )
    {
        var retArray    = [];
        var stringIndex = 0;
        
        while( true )
        {
            var first_Line = this.rawData.indexOf( "<"+tag  ,    stringIndex );
            var last_Line  = this.rawData.indexOf( "</"+tag+">", first_Line  );
            
            if( first_Line == -1  )  
                return retArray;
             
            if( last_Line == -1 )
            alert("FUBAR");//    throw new Exception( Exception.Type.INVALID, "GPP - Bad Interval: " + first_Line + " , " + last_Line );
             
        retArray.push( new Field(  this.rawData.substring( first_Line, last_Line ), tag ) );
        stringIndex = last_Line;
        }
    }
    
    Field.prototype.get_Variables = function()
    {
        var retArray         = [];
        var repeats          = this.rawData.split("\n").length;
            repeats         -= 2; // Skip the <tag> line at the start as well as </tag> line at the end
        
        var stringIndex      = '<'+this.label+'>'.length;
            stringIndex     += '<attributes> \n'.length;  //field.rawData.indexOf( '<'+field.label+'>'  , stringIndex   );
        
        for( var i = 0; i < repeats; i++ )
        {
            var label_Begin  = this.rawData.indexOf( 'name="'  , stringIndex   );
            var type_Begin   = stringIndex + '" />'.length;
            var type_End     = label_Begin;
            var type         = this.rawData.substring( type_Begin, type_End  );
            
            label_Begin     += 'name="'.length;
            
            var label_End    = this.rawData.indexOf( '"'       , label_Begin   );
            var value_Begin  = this.rawData.indexOf( 'value=' ,  stringIndex   );
            
            value_Begin     += 'value="'.length;
            
            var value_End    = this.rawData.indexOf( '"'      , value_Begin    );
            var label        = this.rawData.substring( label_Begin, label_End  );
            var value        = this.rawData.substring( value_Begin, value_End  );
             
            retArray.push( new Variable(  label,  value, type ) );
            stringIndex = value_End;
        }
     
    return retArray;
    }
    
    
    Field.prototype.get_Attributes = function( tag )
    {
        var retArray    = [];
        var stringIndex = 0;
        
        while( true )
        {
            var first_Line = this.rawData.indexOf( "<"+tag  , stringIndex );
            var last_Line  = this.rawData.indexOf( "/>"     , first_Line  );
        
            if( first_Line == -1  )
                return retArray;
            
            if( last_Line == -1 )
            {
                last_Line = this.rawData.indexOf( "</"+tag+">",   first_Line );
         
                if( last_Line == -1 ) 
                    throw new Exception( Exception.Type.MISMATCH , "GPP - Opening " + "<"+tag+ " found but failed to terminate!: " + tag );
            }
   
            retArray.push( new Attribute(  this.rawData.substring( first_Line, last_Line ) ) );
            stringIndex = last_Line;
        }
    }
    
    
    Field.prototype.get_Type = function( tag )
    {
        if( this.type == "NULL")
        {
            var begin  = this.rawData.indexOf( '="' , 0    );
                begin += '="'.length;
            var end    = this.rawData.indexOf( '"'      , begin );
            this.type  = this.rawData.substring( begin, end );
        }
        
    return this.type;
    }
    
//////////////////////////////   
    
    function Attribute( data )
    {
        this.rawData = data;
    }
    
    Attribute.prototype.alert =  function()
    {
        alert( this.rawData );
    }


//////////////////////////////        
       
    function Variable( label, value, type )
    {
        this.label = label.trim();  
        this.value = value.trim();  
        this.type  = type.trim();       
    }
    
    Variable.prototype.alert =  function()
    {
        alert( this.label + " = "+ this.value );
    }
    
    Variable.prototype.casted  = function()
    {
        switch( this.type ) 
        {
            case "<int"      : return   parseInt( this.value );
            case "<float"    : return parseFloat( this.value );
            case "<bool"     : if( this.value == "true"){  return true; } else return false;
            
            case "<vector3d" : var values = this.value.split(" ");  
                               return  new Vector3( parseFloat( values[0] ), parseFloat( values[1] ) , parseFloat( values[2] ) );
        
            case "<colorf"   : var values = this.value.split(" "); 
                               return new Vector3( parseFloat( values[0] ), parseFloat( values[1] ) , parseFloat( values[2] ) );                   
        
            case  "<color"   : return   parseInt( this.value );
            
            case "<string"   : return this.value;
            case "<texture"  : return this.value;
            case "<enum"     : return this.value;
        }
    
    alert( this.type );
    return "NULL";
    }


    