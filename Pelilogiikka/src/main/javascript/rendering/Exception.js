    Exception.Type = 
    {
        FATAL       : "FATAL", 
        NULL        : "NULL",
        UNDEFINED   : "UNDEFINED",
        MISMATCH    : "MISMATCH",
        INVALID     : "INVALID",
        SINGLETON   : "SINGLETON",
        TYPE        : "TYPE",
        UNSUPPORTED : "UNSUPPORTED"
    }   

    function Exception( type , message )
    {
        this.type    = type;
        this.message = message;
    }

    Exception.prototype.alert = function()
    {
        alert( "Exception caught: " + this.type + " : " + this.message );
    }
    
    Exception.prototype.log  = function()
    {
       console.log( "Exception caught: " + this.type + " : " + this.message  ); 
    }
    
    
    
    
    function ASSERT_INTERVAL( entry, low, high, onFailMessage )
    {  
        if( !IS_NUMERIC( entry ) )
            throw new Exception( Exception.Type.MISMATCH, onFailMessage );
        
        if( entry < low || entry > high )
            throw new Exception( Exception.Type.INVALID, onFailMessage );
    }
    
    
    function ASSERT_SINGLETON( entry , onFailMessage )
    {
        if( entry != null ) 
            throw new Exception( Exception.Type.SINGLETON, onFailMessage );   
    }
   
  
    function ASSERT_VALID( entry , onFailMessage )
    {
        if( typeof entry == 'undefined' )
            throw new Exception( Exception.Type.UNDEFINED , onFailMessage );
        
        if( entry == null )
            throw new Exception( Exception.Type.NULL , onFailMessage );
    }
        
    
    function ASSERT_POSITIVE( entry , onFailMessage )
    {
        if( !IS_NUMERIC( entry ) )
            throw new Exception( Exception.Type.MISMATCH, onFailMessage );
        
        if( entry <= 0 )
            throw new Exception( Exception.Type.INVALID, onFailMessage );
    }
    
  
    function ASSERT_TYPE( type , instance , onFailMessage )
    {
        if( !(instance instanceof type) ) 
            throw new Exception( Exception.Type.TYPE , onFailMessage );
    }
    
    
    function VALID( entry ) 
    {
        return ( typeof entry != 'undefined' ) && ( entry != null );
    }
    
    
    function IS_NUMERIC( value ) 
    {
        return ( typeof value == 'number' );
    }   
    
    
    
    function Root_Exception_Handler( entryPoint )
    {
        console.log( "Exception handler set" );
        
        try
        {
            entryPoint();
        }
        catch( exception )
        {
            try
            {
                ASSERT_TYPE( Exception, exception , "ULTIMATE FAILURE!");
            }
            catch( exception )
            {
                alert("This software has 3==>{DOG}(O_o)  Exception emitted was of uncatchable type. You suck and your program smells like a barnyard. ")
            }
         
        exception.alert();
        }
        
    console.log( "Application temrinated" );
    }
    