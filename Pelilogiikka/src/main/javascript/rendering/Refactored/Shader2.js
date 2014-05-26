
// This function links a string literal to a member variable with an explicit type
function ShaderRef( gl, type, label, reference )
{   
    this.gl        = gl;
    this.type      = type;
    this.label     = label;
    this.reference = reference;
}


ShaderRef.prototype.check_Type = function( sInput )
{
    if( sInput.type != this.type ) 
            throw ("Shader term type mismatch: Tried to assign " + sInput.type + " to " + term.type+ " !");
}



// This is the structure that delivers parameters to shader from the outside.  key maps to Ref label, value is sent to reference. Type safety is enforced.
function ShaderInput( type, key, value ) // <int> <lol> (=) <0>;
{ 
    this.type  = type;
    this.key   = key;
    this.value = value;
}





Shader2.prototype.declare_Variable = function( label ) 
{
    return new ShaderRef( this.gl, label, this.dataSegment[ this.dataPointer++ ] );
}



Shader2.prototype.declare_Terms = function( uniforms, attributes, variables, samplers )
{
    uniforms.forEach( function( uniform )
    {
        var uTerm = this.declare_Variable( uniform , this.gl.getUniformLocation( this.program ,  uniform.label )  );
        this.uniforms.push( uTerm );
    });
    
    attributes.forEach( function( attribute )
    {   
        var aTerm = this.declare_Variable( attribute, this.gl.getAttribLocation( this.program , attribute.label )  );
        this.attributes.push( aTerm );
    });
     
    variables.forEach( function( variable )
    {   
        var vTerm = this.declare_Variable( variable , this.gl.getUniformLocation( this.program , variable.label  )  );
        this.variables.push( vTerm  );
    });
    
    samplers.forEach( function( sampler )
    {
        var mTerm = this.declare_Variable( sampler, this.gl.getUniformLocation(this.shaderProgram, sampler.label )  );
        this.samplers.push( mTerm  );
    });
    
}



Shader2.prototype.assign_Term = function( type, sInput )
{
    if( !sInput )
        throw "Shader null input exception!";
    
    switch( type ) 
    {
        case "UNIFORM":  
                            var index = this.uniforms.indexOf( sInput.label );
                            if( index == -1 ) throw ("Shader term not declared: " + sInput.label );
                            var term = this.uniforms[ index ];
                                term.check_Type();
                                            
                            switch( term.type )             // NOT YET IMPLEMENTED
                            {
                                case "VEC3"    :    break;
                                case "VEC4"    :    break;
                                case "INT"     :    break;
                                case "FLOAT"   :    break;
                                case "MATRIX44":    break;
                                case "TEXTURE" :    break;
                            }
        break;
        case "ATTRIBUTE":   
                            var index = this.attributes.indexOf( sInput.label );
                            var term = this.attributes[ index ];
                                term.check_Type();
                           
                            switch( term.type )             // NOT YET IMPLEMENTED
                            {
                                case "VEC3"    :    break;
                                case "VEC4"    :    break;
                                case "INT"     :    break;
                                case "FLOAT"   :    break;
                                case "MATRIX44":    break;
                                case "TEXTURE" :    break;
                            }
            
        break;
        case "VARIABLE" :   
                            var index = this.variables.indexOf( sInput.label );
                            if( index == -1 ) throw ("Shader term not declared: " + sInput.label );
                                 term = this.variables[ index ];
                                 term.check_Type();
                             
                            switch( term.type )             // NOT YET IMPLEMENTED
                            {
                                case "VEC3"    :    break;
                                case "VEC4"    :    break;
                                case "INT"     :    break;
                                case "FLOAT"   :    break;
                                case "MATRIX44":    break;
                                case "TEXTURE" :    break;
                            }
                                 
        break; 
        case "SAMPLER" : 
                            var index = this.samplers.indexOf( sInput.label );
                            if( index == -1 ) throw ("Shader term not declared: " + sInput.label );
                            var  term   = this.samplers[ index ];
                                 term.check_Type();
                            
                            switch( term.type )             // NOT YET IMPLEMENTED
                            {
                                case "VEC3"    :    break;
                                case "VEC4"    :    break;
                                case "INT"     :    break;
                                case "FLOAT"   :    break;
                                case "MATRIX44":    break;
                                case "TEXTURE" :    break;
                            }
                            
        break;
    
    default: throw ("Ambiguous Shader Term: " + type );
    }
   
}


Shader2.prototype.bind = function( uniform_Values, attribute_Values, variable_Values, map_References)
{

      uniform_Values.forEach( function( value )
      {
           assign_Term( "UNIFORM" , value );
      });
   
}





function Shader2( renderer, label_VS, label_PS, shader_Terms  )
{ 
    // Declare external references
    this.gl = renderer.gl;
    
    // Declare local "private" variables
    this.dataSegment = [];                                            // For all intents and purposes, this is a void*. Don't touch it under any circumstances!!! 
    this.dataPointer =  0;                                            // Don't touch this at all either! At the very least, DO NOT DECREMENT!!!

    // Declare space for shader terms.
    this.uniforms    = [];                                            // Uniform constants
    this.attributes  = [];                                            // Vertex attributes
    this.variables   = [];                                            // Pixel shader variables
    this.samplers    = [];                                            // Samplers associated with the shader. Index implies texture slot as well!
   
    // Begin the initialization
    this.program = build_Shader( this.gl, label_VS, label_PS );       // Here we shall attempt to create a shader program from the user supplied parameters
   
    this.gl.useProgram( this.program );       

    declare_Terms( shader_Terms[0], shader_Terms[1], shader_Terms[2] , shader_Terms[3] );
}















/*

    function ShaderFeatures( mappings )    
    {
        if( mappings[0] == "NORMAL") this.normal_Map = true;
        else
            this.normal_Map   = false;
        
        if( mappings[1] == "PARALLAX") this.parallax_Map = true;
        else
            this.parallax_Map   = false;
    }





    
   

    function Shader( gl, vs_Program, ps_Program, features )
    {
        this.features       = features;//features;
        
	var fragmentShader  = this.getShader( gl, ps_Program      );	
	var vertexShader    = this.getShader( gl, vs_Program      );
        this.shaderProgram  = gl.createProgram();
	
	gl.attachShader( this.shaderProgram, vertexShader         );
	gl.attachShader( this.shaderProgram, fragmentShader       );	
	gl.linkProgram ( this.shaderProgram                       );

	if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) 
	{
            alert("Could not load shader!");
	}
        
        gl.useProgram( this.shaderProgram );        // Make the shader active.


        this.shaderProgram.vertexPositionAttribute   = gl.getAttribLocation( this.shaderProgram, "vertexPos");
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexPositionAttribute);

        this.shaderProgram.vertexNormalAttribute     = gl.getAttribLocation( this.shaderProgram, "vertexNormal" );
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexNormalAttribute);                
       
        this.shaderProgram.vertexBinormalAttribute   = gl.getAttribLocation( this.shaderProgram, "vertexBinormal");
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexBinormalAttribute);                
      
      
        this.shaderProgram.vertexTangentAttribute    = gl.getAttribLocation( this.shaderProgram, "vertexTangent");
                                                       gl.enableVertexAttribArray(this.shaderProgram.vertexTangentAttribute);                
   
        
        
        this.shaderProgram.textureCoordAttribute   = gl.getAttribLocation(this.shaderProgram,  "vertexUV");
                                                     gl.enableVertexAttribArray(this.shaderProgram.textureCoordAttribute);
        
        this.shaderProgram.samplerUniform          = gl.getUniformLocation(this.shaderProgram, "texSampler" );
        
        
        
        
        this.shaderProgram.pMatrixUniform          = gl.getUniformLocation(this.shaderProgram, "projMatrix"     );
	
        this.shaderProgram.mvMatrixUniform         = gl.getUniformLocation(this.shaderProgram, "worldViewMatrix");
        
        this.shaderProgram.mMatrixUniform          = gl.getUniformLocation(this.shaderProgram, "worldMatrix"    );
        
    
    
    // Setting up the light rack
        
        this.shaderProgram.lightsUniform        = gl.getUniformLocation( this.shaderProgram, "lights"); 
        this.shaderProgram.lightCntUniform      = gl.getUniformLocation( this.shaderProgram, "lightCnt"); 
        this.shaderProgram.lColorsUniform       = gl.getUniformLocation(this.shaderProgram, "lColors"    );
        
        this.shaderProgram.eyePositionUniform   = gl.getUniformLocation( this.shaderProgram, "eyePosition"); 
    }
    
   
   

    Shader.prototype.bind = function( gl , tex1, tex2, tex3, tex4, lights, camera )
    {
        
        gl.uniform4f( this.shaderProgram.vColor, 1.0,1.0,1.0,1.0 ); // Upload various values to the shader
        
        
        // Texture 1 is always active! 
      //  gl.activeTexture( gl.TEXTURE0 );
       //   gl.bindTexture( gl.TEXTURE_2D, tex1.data );
   
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex1.data );
        gl.uniform1i( gl.getUniformLocation(this.shaderProgram, "texSampler"), 0);
        
         
        if( this.features.normal_Map == true )
        {  
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, tex2.data );
            gl.uniform1i( gl.getUniformLocation(this.shaderProgram, "normalSampler"), 1);
         
            if( this.features.parallax_Map == true )
            {
                  gl.activeTexture(gl.TEXTURE2);
                  gl.bindTexture(gl.TEXTURE_2D, tex3.data );
                  gl.uniform1i( gl.getUniformLocation(this.shaderProgram, "dispSampler"), 2);
            }
       
        }
       
       
        var lightCnt = lights.length;
       
        if( lightCnt != 0 )  // Setup lights here.
        {
            var posArray = [];
            var colArray = [];
            
            for( var i = 0; i < lightCnt; i++ )   //"-64.297035 , -34.088657 , -117.10157"
            {
                var pos = lights[i].orientation.get_Position();
                
                posArray.push( pos.x );
                posArray.push( pos.y );
                posArray.push( pos.z );
                
                var col = lights[i].colors[1];  // Diffuse
                
                colArray.push(  1.0 );
                colArray.push(  1.0 );
                colArray.push(  1.0 );
            }
            
            
            this.shaderProgram.lights    = gl.getUniformLocation(this.shaderProgram , "lights"    );  
                                           gl.uniform3fv( this.shaderProgram.lightsUniform   , posArray  );
        
                                           
            this.shaderProgram.lightCnt  = gl.getUniformLocation(this.shaderProgram, "lightCnt"    );
                                           gl.uniform1i( this.shaderProgram.lightCntUniform , lightCnt    );    
                                           
               
            this.shaderProgram.lColors   = gl.getUniformLocation(this.shaderProgram, "lColors"    );
                                           gl.uniform3fv( this.shaderProgram.lColorsUniform , colArray      );    
                                              
        }
       
       
        var eyePos = camera.get_Position();
        
        
        this.shaderProgram.eyePositionUniform  = gl.getUniformLocation(this.shaderProgram, "eyePosition"    );
                                                 gl.uniform1i( this.shaderProgram.eyePositionUniform , [eyePos.x,eyePos.y,eyePos.z]    );   
       
       
       
    gl.useProgram( this.shaderProgram );        // Make the shader active.
    }
    
    
    
    
    
    
    */