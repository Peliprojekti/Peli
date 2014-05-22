   
   
  //////////////////////////////     
   
   function Field( data, label )
    {
        this.rawData = data;
        this.label   = label;
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
             {
                return retArray;
             }
             
             if( last_Line == -1 )
             {
                throw "Bad Interval: " + first_Line + " , " + last_Line;
             }
            
        retArray.push( new Field(  this.rawData.substring( first_Line, last_Line ), tag ) );
        stringIndex = last_Line;
        }
    }
    
    
    
    
    Field.prototype.get_Variables = function()
    {
        var retArray    = [];
       
        alert( this.rawData );
        var repeats = this.rawData.split("\n").length;
            repeats -= 2; // Skip the <tag> line at the start as well as </tag> line at the end
        
        var stringIndex  = '<'+field.label+'>'.length;  //field.rawData.indexOf( '<'+field.label+'>'  , stringIndex   );
           
        
        for( var i = 0; i < repeats; i++ )
        {
            var label_Begin  = this.rawData.indexOf( 'name="'  , stringIndex   );
                label_Begin += 'name="'.length;
            
            var label_End    = this.rawData.indexOf( '"'       , label_Begin   );
             
            var value_Begin  = this.rawData.indexOf( 'value=' ,  stringIndex   );
                value_Begin += 'value="'.length;
            
            var value_End    = this.rawData.indexOf( '"'      , value_Begin    );
         
            var label        = this.rawData.substring( label_Begin, label_End  );
            var value        = this.rawData.substring( value_Begin, value_End  );
             
            retArray.push( new Variable(  label,  value ) );
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
            {
                return retArray;
            }

            if( last_Line == -1 )
            {
                last_Line  = this.rawData.indexOf( "</"+tag+">",   first_Line );
         
                if( last_Line == -1 ) 
                {
                    throw "Opening " + "<"+tag+ " found but failed to terminate!: " + tag;
                }
            }
   
   
        retArray.push( new Attribute(  this.rawData.substring( first_Line, last_Line ) ) );
        stringIndex = last_Line;
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
 //////////////////////////////   
    
    
    function Attribute( data )
    {
        this.rawData = data;
    }
    
    Attribute.prototype.report =  function()
    {
        alert( this.rawData );
    }
    
       
       
   //////////////////////////////        
       
       
    function Variable( label, value )
    {
        this.label = label;
        this.value = value;
    }
    
    Variable.prototype.report =  function()
    {
        alert( this.label + " = "+ this.value );
    }

