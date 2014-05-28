function Exception( type, message )
{
    this.type    = type;       // What kind of an exception is this?
    this.message = message;    // Any details on the issue?
}




function Root_Exception_Handler()
{  
   console.info("Root Exception Handler set");
   
   try
   {
        main();
   }
   catch( exception )
   {
       alert("Vituix meni: " + exception.type + " -> " + exception.message );
       
   }
    
}