// This is an example file that shows how shaders are described from now on.

// Start by declaring namespace that has the same name as the filename.
var Shader1 = 
{
         
    initializer :  function( gl , shaderProgram )
    {
        shaderProgram.vertexPositionAttribute   = gl.getAttribLocation( shaderProgram, "vertexPos");
                                                  gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
        shaderProgram.vertexNormalAttribute     = gl.getAttribLocation(shaderProgram, "vertexNormal" );
                                                  gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);                
        shaderProgram.vertexBinormalAttribute   = gl.getAttribLocation( shaderProgram, "vertexBinormal");
                                                  gl.enableVertexAttribArray(shaderProgram.vertexBinormalAttribute);                
        shaderProgram.vertexTangentAttribute    = gl.getAttribLocation( shaderProgram, "vertexTangent");
                                                  gl.enableVertexAttribArray(shaderProgram.vertexTangentAttribute);                
        shaderProgram.textureCoordAttribute     = gl.getAttribLocation(shaderProgram,  "vertexUV");
                                                  gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
        shaderProgram.samplerUniform            = gl.getUniformLocation(shaderProgram, "texSampler" );
        shaderProgram.pMatrixUniform            = gl.getUniformLocation(shaderProgram, "projMatrix"     );
        shaderProgram.mvMatrixUniform           = gl.getUniformLocation(shaderProgram, "worldViewMatrix");
        shaderProgram.mMatrixUniform            = gl.getUniformLocation(shaderProgram, "worldMatrix"    );
        shaderProgram.lightsUniform             = gl.getUniformLocation( shaderProgram, "lights"); 
        shaderProgram.lightCntUniform           = gl.getUniformLocation( shaderProgram, "lightCnt"); 
        shaderProgram.lColorsUniform            = gl.getUniformLocation(shaderProgram, "lColors"    );
        shaderProgram.eyePositionUniform        = gl.getUniformLocation( shaderProgram, "eyePosition"); 
    },


    binder :  function(  gl , shaderProgram, shaderFeatures,  tex1, tex2, tex3, tex4, lights, camera )
    {
        gl.uniform4f( shaderProgram.vColor, 1.0,1.0,1.0,1.0 ); // Upload various values to the shader
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex1.data );
        gl.uniform1i( gl.getUniformLocation( shaderProgram, "texSampler"), 0);
        
        if( shaderFeatures.normal_Map == true )
        {     
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, tex2.data );
            gl.uniform1i( gl.getUniformLocation( shaderProgram, "normalSampler"), 1);
         
            if( shaderFeatures.parallax_Map == true )
            {
                gl.activeTexture(gl.TEXTURE2);
                gl.bindTexture(gl.TEXTURE_2D, tex3.data );
                gl.uniform1i( gl.getUniformLocation( shaderProgram, "dispSampler"), 2);
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
            
        shaderProgram.lights        = gl.getUniformLocation(shaderProgram , "lights"           );  
                                      gl.uniform3fv( shaderProgram.lightsUniform   , posArray  );
        
        shaderProgram.lightCnt       = gl.getUniformLocation(shaderProgram, "lightCnt"          );
                                       gl.uniform1i( shaderProgram.lightCntUniform , lightCnt   );    
                                           
        shaderProgram.lColors        = gl.getUniformLocation(shaderProgram, "lColors"           );
                                       gl.uniform3fv( shaderProgram.lColorsUniform , colArray   );    
        }
       
        var eyePos = camera.get_Position();
        shaderProgram.eyePositionUniform  = gl.getUniformLocation(shaderProgram, "eyePosition"    );
                                            gl.uniform1i( shaderProgram.eyePositionUniform , [eyePos.x,eyePos.y,eyePos.z]    );   
    },




    load : function( gl, features ) 
    {   
         var path = "data/Shaders/Shader1/";
        
         var p1 = new Parser(path+"/VertexShader.txt"); 
         var p2 = new Parser(path+"/PixelShader.txt" ); 
   
    return new Shader( gl, p1.the_Document.rawData, p2.the_Document.rawData, features, new ShaderTemplate( Shader1.initializer, Shader1.binder ) );
    }

    
};