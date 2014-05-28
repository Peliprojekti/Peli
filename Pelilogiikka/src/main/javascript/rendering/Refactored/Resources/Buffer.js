	
        
    function Buffer( gl, token ) 
    {  
       if( !VALID(token) ) throw new Exception( "NULL", "Undefined Meshbuffer attribute!" );
        
       this.gl    = gl;
       this.data  = gl.createBuffer();		
       this.label = token.label;
       
       if( !this.data )    throw new Exception( "FATAL", "WebGL failed to allocate a buffer" );
        
       switch( token.type )
       {
           
           case "VEC3": 
                            this.item_Size  = 3;
                            this.item_Type  = gl.FLOAT;
                            
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( token.data ), gl.STATIC_DRAW);   
           break;
           
           case "VEC2": 
                            this.item_Size  = 2;
                            this.item_Type  = gl.FLOAT;
                            
                            gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
                            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( token.data ), gl.STATIC_DRAW);
           break;
           
           case "INT" : 
                            this.item_Size  = 1;
                            this.itemType   = gl.UNSIGNED_SHORT;
                            
                            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.data );
                            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( token.data ), gl.STATIC_DRAW);
                            
           break;
           
           case "FLOAT": 
                            this.item_Type = gl.FLOAT;
           break;

       default: throw new Exception( "UNSUPPORTED", "Vertex buffer encountered an unsupported attribute type: " + token.type );
       }
        
    this.data.itemCount = token.data.length / this.data.itemSize;     
    }   
    
    
    Buffer.prototype.bind = function( target ) 
    {
        this.gl.bindBuffer( this.gl.ARRAY_BUFFER, this.data );
        this.gl.vertexAttribPointer( target, this.item_Size, this.item_Type, false, 0, 0);   
    }


