	
    function Buffer( gl, item_Type, itemList, entrySize ) 
    {             
        this.data           = gl.createBuffer();		
        this.data.itemSize  = entrySize;
        this.data.numItems  = itemList.length / entrySize;
		
        
        
        if( item_Type === "FLOAT")
        { 
              gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
              gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( itemList ), gl.STATIC_DRAW);   
              this.itemType = gl.FLOAT;
        } 
         else
           if( item_Type === "INT")
           { 
                 gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.data );
                 gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( itemList ), gl.STATIC_DRAW);
                 this.itemType = gl.UNSIGNED_SHORT;
           }
           else 
              { 
                 this.itemType = "UNKNOWN";
                 throw ("Unrecognized buffer format " + item_Type);
              }
    }   
    
    
    
    Buffer.prototype.bind = function( gl, target ) 
    {
        gl.bindBuffer( gl.ARRAY_BUFFER, this.data );
        gl.vertexAttribPointer( target, this.data.itemSize, this.itemType, false, 0, 0);   
    }
    