  
  
  
 
  
  function Process( executor, fPreProtocol , fInvariant, fIteration, fPostProtocol)
  {
    this.exec    = executor;
    this.phase   = [ fPreProtocol, fIteration, fPostProtocol, gfDetachProcess ];
    this.state   = 0;
  }
  
  
  
  Process.prototype.execute = function( timeStamp )
  {
      if( this.state == 1 ) 
      {
           if( this.phase[ this.state ] ) fIteration( timeStamp ); 
            else
                this.state = 2;
      return;
      }
      else
          {
            return this.phase[ this.state++ ];
          }
  }
  
  
  
  
  function Executor()
  {
     this.processes = 0;    
     this.procList  = [ ];
  }
  
 
  
  
  Executor.prototype.execute = function( timeStamp )
  {
     this.procList.forEach( function( process )
     {
          process.execute( timeStamp );
     });
  }
  
  
  
  Executor.prototype.register = function( process )
  {
      this.procList.push( process );
  }
  
  Executor.prototype.unregister = function( process )
  {
      
      // How to do this then?!?!
  }