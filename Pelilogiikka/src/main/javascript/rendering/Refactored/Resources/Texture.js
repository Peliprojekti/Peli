

function TextureFilter( minification_Filter , magnification_Filter )
{
    this.minification_Filter  = minification_Filter;
    this.magnification_Filter = magnification_Filter;
}




function Texture( renderer, fileName, filtering )
{
    this.gl = renderer.gl;
    
    try
      {
         var myTexture       = this.gl.createTexture();
             myTexture.image = new Image();
            
            myTexture.image.onload = function () 
            {
                onLoad( gl, myTexture, filtering );
            };

            myTexture.image.src = fileName;       
            
        this.data  = myTexture;
        }
        catch( exception )
        {
          throw new Exception( "NULL" , "Failed to load texture: " + fileName + " due to :" + exception.message );
        }
}



Texture.prototype.bind = function( texture_Slot )
{
    var slot = -1;
    
    switch( texture_Slot )
    {
        case 0: slot = this.gl.TEXTURE1; 
        break;
            
        case 1: slot = this.gl.TEXTURE2;
        break;
            
        case 3: slot = this.gl.TEXTURE5; 
        break;
            
        case 4: slot = this.gl.TEXTURE4;
        break;
        
    default: throw new Exception( "BAD_INDEX" , "Attempted to bind texture: "+this.data.src + " to unsupported texture slot: " + texture_Slot +"!");
    }
    
    
    this.gl.activeTexture( slot                        );
    this.gl.bindTexture( this.gl.TEXTURE_2D, this.data );
}











/// Filthy util functions that are not part of the object instance.

   function onLoad( gl, texture, textureFilter )
    {
        gl.bindTexture(gl.TEXTURE_2D, texture); 
      
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        
        
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST );
         gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST );
        
        
        /*
        if( flags === "FILTER_PLAIN")
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST            );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST            );
        }
        else
        {
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR                           );
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST            );
            gl.generateMipmap(gl.TEXTURE_2D);
        }
       */
        
        
    gl.bindTexture(gl.TEXTURE_2D, null);
    }





    /*
   

    function Texture( gl, fileName, flags )
    {
      
        try
        {
            var myTexture          = gl.createTexture();
            myTexture.image        = new Image();
            
            myTexture.image.onload = function () 
            {
                onLoad( gl, myTexture, flags );
            };

            myTexture.image.src = fileName;       
            this.data           = myTexture;
        }
        catch( exception )
        {
            alert( exception );
        }
    }
    
     
*/