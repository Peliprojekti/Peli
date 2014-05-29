function ShaderTerms( vs_Label, ps_Label, uniforms, attributes, variables, samplers )
{
    this.vs_Label   = vs_Label;
    this.ps_Label   = ps_Label;
    
    this.uniforms   = uniforms;
    this.attributes = attributes;
    this.variables  = variables;
    this.samplers   = samplers;
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
    this.program          = build_Shader( this.gl, shdTerms.vs_Label, shdTerms.ps_Label );       // Here we shall attempt to create a shader program from the user supplied parameters
    
    this.gl.useProgram( this.program );       
 
    for( var i = 0; i < shdTerms.uniforms.length; i++ )
    {
        var uniform       = shdTerms.uniforms[i];
            uniform.value =  this.gl.getUniformLocation(this.program, uniform.label );
   
    this.uniform_Terms.push( uniform );
    }
 
    for( var i = 0; i < shdTerms.attributes.length; i++ )
    {
        var attribute       = shdTerms.attributes[i];
            attribute.value =  this.gl.getUniformLocation(this.program, attribute.label );
   
    this.attribute_Terms.push( attribute );
    }
 
    for( var i = 0; i < shdTerms.variables.length; i++ )
    {
         var variable       = shdTerms.variables[i];
             variable.value =  this.gl.getUniformLocation(this.program, variable.label );
   
    this.variable_Terms.push( attribute );
    }
 
    for( var i = 0; i < shdTerms.samplers.length; i++ )
    {
         var sampler       = shdTerms.samplers[i];
             sampler.value =  this.gl.getUniformLocation(this.program, sampler.label );
   
    this.sampler_Terms.push( sampler  );
    }
}





Shader.prototype.bind = function( uniforms, attributes, variables, maps )   
{
    // By now, we have a several lists of terms.
    // These terms will be assigned here.
}




