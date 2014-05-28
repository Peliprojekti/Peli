function ShaderTerms( vs_Label, ps_Label, uniforms, attributes, variables, samplers )
{
    this.vs_Label   = vs_Label;
    this.ps_Label   = ps_Label;
    
    this.uniforms   = uniforms;
    this.attributes = attributes;
    this.variables  = variables;
    this.samplers   = samplers;
}



function Shader( renderer, shdTerms  )
{ 
    // Declare external references
    this.gl               = renderer.gl;

    // Declare space for shader terms.
    this.uniform_Terms    = [];         // Uniform constants
    this.attribute_Terms  = [];         // Vertex attributes
    this.variable_Terms   = [];         // Pixel shader variables
    this.sampler_Terms    = [];         // Samplers associated with the shader. Index implies texture slot as well!
   
   
    // Begin the initialization
    this.program = build_Shader( this.gl, shdTerms.vs_Label, shdTerms.ps_Label );       // Here we shall attempt to create a shader program from the user supplied parameters
   
    this.gl.useProgram( this.program );       

    this.uniform_Terms.push( shdTerms.uniforms.forEach( function( uniform )     
    {
        uniform.value =  this.gl.getUniformLocation(this.program, uniform.label );
    
    return uniform;
    }));
  
    this.attribute_Terms.push( shdTerms.attributes.forEach( function( attribute )     
    {
        attribute.value =  this.gl.getAttribLocation      ( this.program, attribute.label      );
                           this.gl.enableVertexAttribArray( attribute.value                    );   
    return attribute;
    }));
  
  
    this.variable_Terms.push( shdTerms.variables.forEach( function( variable )     
    {
        variable.value =  this.gl.getUniformLocation( this.shaderProgram, variable.label ); 
    
    return variable;
    }));
  
  
    this.sampler_Terms.push( shdTerms.samplers.forEach( function( sampler )      
    {
        sampler.value = this.gl.getUniformLocation(this.shaderProgram, sampler.label );
    
    return sampler;
    }));
    
}





Shader.prototype.bind = function( uniform_Values, attribute_Values, variable_Values, map_References)
{
    // By now, we have a several lists of terms.
    // These terms will be assigned here.
    

}











/// Filthy util functions that are not part of the object instance.

 function getShaderBy_ID(gl, shaderScript, type  ) 
 {
       // var shaderScript = document.getElementById(id);
       
        if (!shaderScript) 
        {
            throw new Exception( "NULL" + "Failed to load " + type + " shader asset!");
        }
        
       
        
        
        var str = "";
        var k = shaderScript.firstChild;
        while (k) 
        {
            if (k.nodeType == 3) 
            {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
          
           
        if ( type == "PIXEL_SHADER")    shader = gl.createShader(gl.FRAGMENT_SHADER);
        else 
            if ( type == "VERTEX_SHADER")  shader = gl.createShader(gl.VERTEX_SHADER);
            else 
                 throw new Exception( "UNSUPPORTED" + "Shader type " + type + " is invalid or unsupported.");
               
         
        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert( gl.getShaderInfoLog(shader) );
            return null;
        }

    return shader;
    }
    
    


function build_Shader( gl , source_VS , source_PS )
{
    var shaderProgram = null;
    
    try
    {
        var vertexShader = gl.createShader( gl.VERTEX_SHADER   );
        var pixelShader  = gl.createShader( gl.FRAGMENT_SHADER );
        
        gl.shaderSource ( vertexShader , source_VS );
        gl.shaderSource ( pixelShader  , source_PS );
          
        gl.compileShader( vertexShader             );
        gl.compileShader( pixelShader              );
        
        shaderProgram = gl.createProgram();
         
        gl.attachShader( shaderProgram, vertexShader );
        gl.attachShader( shaderProgram, pixelShader  );	
        gl.linkProgram ( shaderProgram               );
            
        if( !gl.getProgramParameter( shaderProgram, gl.LINK_STATUS) ) 
        {
            var vs_Status   = gl.getShaderInfoLog( vertexShader ) 
            if( vs_Status == "" ) vs_Status = "OK";
            
            var ps_Status   = gl.getShaderInfoLog( pixelShader  );
            if( ps_Status == "" ) ps_Status = "OK";
          
            var stateString = "Shader building error \n \n Vertex Shader status: " + vs_Status + "\n Pixel shader status: " + ps_Status;
            
        alert( stateString );
        }
   
    }
    catch( exception )
    {
        alert("Something went exceptionally bad with shader loading: " + exception.toString() );
        // Substitute default shader?
        // Abort and hard crash?
        // Abort and restart?
        // Ditch the shader and ignore all geometry referring to it?
    }
    
    
return shaderProgram;
}