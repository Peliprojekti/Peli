var Guishader = 
{
         
    initializer :  function( gl , shaderProgram )
    {
        shaderProgram.vertexPositionAttribute   = gl.getAttribLocation ( shaderProgram, "vertexPos"      );
        shaderProgram.samplerUniform            = gl.getUniformLocation( shaderProgram, "texSampler"     );
        shaderProgram.mMatrixUniform            = gl.getUniformLocation( shaderProgram, "worldMatrix"    );
    },


    binder :  function(  gl , shaderProgram, shaderFeatures,  tex1, tex2, tex3, tex4, lights, camera )
    {
        gl.uniform4f     ( shaderProgram.vColor, 1.0,1.0,1.0,1.0                    );
        gl.activeTexture ( gl.TEXTURE0                                              );
        gl.bindTexture   ( gl.TEXTURE_2D, tex1.data                                 );
        gl.uniform1i     ( gl.getUniformLocation( shaderProgram, "texSampler"), 0   );
    },


    load : function( gl, features ) 
    {   
         var path = "data/Shaders/Guishader/";
         var p1   = new Parser(path+"/VertexShader.txt"); 
         var p2   = new Parser(path+"/PixelShader.txt" ); 
   
    return new Shader( gl, p1.the_Document.rawData, p2.the_Document.rawData, features, new ShaderTemplate( Guishader.initializer, Guishader.binder ) );
    }

};