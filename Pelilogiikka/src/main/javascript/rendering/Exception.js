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
    alert("Root exception caught: " + this.type + " : " + this.message );
    }
    
    Exception.prototype.log  = function()
    {
       console.log( "Root exception caught: " + this.type + " : " + this.message  ); 
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
            ASSERT_TYPE( Exception, exception , "ULTIMATE FAILURE!");
            exception.alert();
        }
        
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
        
    function VALID( entry ) 
    {
        return ( typeof entry != 'undefined' ) && ( entry != null );
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
       if( !(instance instanceof type) ) throw new Exception( Exception.Type.TYPE , onFailMessage );
    }
    
    function IS_NUMERIC( value ) 
    {
         return ( typeof value == 'number');
    }   