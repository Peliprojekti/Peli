	
function Buffer( type, itemList, entrySize ) 
{  
    var gl              = the_Renderer.gl;
    this.data           = gl.createBuffer();		
    this.data.itemSize  = entrySize;
    this.data.numItems  = itemList.length / entrySize;
		  
    switch( type ) 
    {
    case "FLOAT":
            
        gl.bindBuffer(gl.ARRAY_BUFFER, this.data );
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array( itemList ), gl.STATIC_DRAW);   
        this.itemType = gl.FLOAT;
            
    break;
            
    case "INT":   
        
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.data );
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array( itemList ), gl.STATIC_DRAW);
        this.itemType = gl.UNSIGNED_SHORT;
    
    break;    
            
    default: throw new Exception( Exception.Type.UNSUPPORTED , 
                                  "Unsupported Buffer format: " + item_Type ); 
    }
        
}   
    
Buffer.prototype.bind = function( target ) 
{  
    var gl = the_Renderer.gl;
    gl.bindBuffer( gl.ARRAY_BUFFER, this.data );
    gl.vertexAttribPointer( target, this.data.itemSize, this.itemType, false, 0, 0);   
}
    
