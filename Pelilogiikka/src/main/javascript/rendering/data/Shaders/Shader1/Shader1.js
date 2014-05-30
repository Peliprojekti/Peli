// This is an example file that shows how shaders are described from now on.

// Start by declaring namespace that has the same name as the filename.
var Shader1 = 
{

   VERTEX_SHADER : "                                                                                         \n"+
"    uniform mat4 worldViewMatrix;                                                                            \n"+
"    uniform mat4 projMatrix;                                                                                 \n"+
"    uniform mat4 worldMatrix;                                                                                \n"+   
"                                                                                                             \n"+   
"    uniform vec3   lights[32];                                                                               \n"+
"    uniform vec3  lColors[32];                                                                               \n"+ 
"    uniform vec3   lAtten[32];                                                                               \n"+ 
"   uniform  int     lightCnt;                                                                                \n"+ 
"                                                                                                             \n"+ 
"    uniform vec3  eyePosition;                                                                               \n"+ 
"                                                                                                             \n"+
"                                                                                                             \n"+
"    attribute vec3    vertexPos;                                                                             \n"+ 
"    attribute vec2    vertexUV;                                                                              \n"+ 
"                                                                                                             \n"+ 
"    attribute vec3    vertexNormal;                                                                          \n"+ 
"    attribute vec3    vertexBinormal;                                                                        \n"+ 
"    attribute vec3    vertexTangent;                                                                         \n"+ 
"                                                                                                             \n"+ 
"    varying   vec4  fragmentPos;                                                                             \n"+ 
"    varying   vec2  fragmentUV;                                                                              \n"+ 
"                                                                                                             \n"+ 
"    varying   vec3  surfaceNormal;                                                                           \n"+ 
"    varying   vec3  surfaceBinormal;                                                                         \n"+ 
"    varying   vec3  surfaceTangent;                                                                          \n"+ 
"                                                                                                             \n"+ 
"    void main(void)                                                                                          \n"+ 
"    {                                                                                                        \n"+
"        fragmentUV      = vertexUV;                                                                          \n"+ 
"        fragmentPos     = worldMatrix * vec4( vertexPos , 1.0 );                                             \n"+                                         
"                                                                                                                                                 \n"+ 
"        vec4      sN4   = normalize( worldMatrix * vec4( vertexNormal   , 0.0 ) );                                                               \n"+                                                                          
"        vec4      sB4   = normalize( worldMatrix * vec4( vertexBinormal , 0.0 ) );                                                               \n"+ 
"        vec4      sT4   = normalize( worldMatrix * vec4( vertexTangent  , 0.0 ) );                                                               \n"+ 
"                                                                                                                                                 \n"+ 
"        surfaceTangent  = vec3( sT4.x, sT4.y, sT4.z );                                                                                           \n"+ 
"        surfaceBinormal = vec3( sB4.x, sB4.y, sB4.z );                                                                                           \n"+ 
"        surfaceNormal   = vec3( sN4.x, sN4.y, sN4.z );                                                                                           \n"+ 
"                                                                                                                                                 \n"+ 
"    gl_Position    = projMatrix * worldViewMatrix * vec4(vertexPos, 1.0);                                                                        \n"+ 
"    }                                                                                                                                              ",
 




PIXEL_SHADER  : "                                                                                                                                 \n"+
"   precision mediump float;                                                                                                                      \n"+
"    uniform vec3   lights[32];                                                                                                                   \n"+  
"    uniform vec3  lColors[32];                                                                                                                   \n"+
"    uniform vec3   lAtten[32];                                                                                                                   \n"+
"    uniform  int     lightCnt;                                                                                                                   \n"+
"    uniform vec3           eyePosition;                                                                                                          \n"+                                                                          
"    uniform sampler2D       texSampler;                                                                                                          \n"+
"    uniform sampler2D    normalSampler;                                                                                                          \n"+
"    uniform sampler2D      dispSampler;                                                                                                          \n"+
"    varying   vec4         fragmentPos;                                                                                                          \n"+
"    varying   vec2          fragmentUV;                                                                                                          \n"+
"    varying   vec3       surfaceNormal;                                                                                                          \n"+
"    varying   vec3     surfaceBinormal;                                                                                                          \n"+
"    varying   vec3      surfaceTangent;                                                                                                          \n"+
"                                                                                                                                                 \n"+
"    void main(void)                                                                                                                              \n"+
"    {                                                                                                                                            \n"+
"          vec2 texCoords      = vec2(fragmentUV.s, fragmentUV.t);                                                                                \n"+
"          vec3 fragPos        = vec3(fragmentPos);                                                                                               \n"+
"                                                                                                                                                  \n"+   
"          vec4 fragVector     = texture2D( normalSampler, texCoords );                                                                            \n"+
"               fragVector    *= 2.0;                                                                                                              \n"+
"               fragVector    -= vec4( 1.0,1.0,1.0,0.0);                                                                                             \n"+
"          vec3 tNormal        = fragVector.x * surfaceTangent + fragVector.y * surfaceBinormal + fragVector.z * surfaceNormal;                          \n"+
"          float total_R       = 0.0;                                                                                                                     \n"+                                                                                                                                            
"          float total_G       = 0.0;                                                                                                                    \n"+
"          float total_B       = 0.0;                                                                                                                   \n"+
"          vec3 rgb;                                                                                                                                    \n"+
"                                                                                                                                                       \n "+  
"        for( int i = 0; i < 16; i++ )                                                                                                                   \n"+                                                                                                                    
"        {                                                                                                                                               \n"+
"            if( i == lightCnt ) break;                                                                                                                  \n"+
"            vec3 light                = lights[i];                                                                                                     \n "+
"            vec3 color                = lColors[i];                                                                                                     \n"+
"            vec3 pixelToLight         = light - fragPos;                                                                                               \n "+
"            vec3 lightVector          = normalize( pixelToLight );                                                                                     \n "+
"            float dist2Light          = length( pixelToLight );                                                                                        \n "+
"            float cosAngle            = dot( lightVector , tNormal );                                                                                  \n "+
"                  cosAngle            = clamp( cosAngle, 0.0, 1.0 );                                                                                   \n "+
"            float constant_Term       = 0.5;                                                                                                           \n "+
"            float linear_Term         = 0.010;                                                                                                          \n"+
"            float quadratic_Term      = 0.00005;                                                                                                        \n"+
"            float attenuation         = 1.0 / ( constant_Term + dist2Light*linear_Term + dist2Light*dist2Light*quadratic_Term );                        \n"+
"            float multiplier_R        = ( cosAngle * attenuation );                                                                                     \n"+
"            float multiplier_G        = ( cosAngle * attenuation );                                                                                     \n"+
"            float multiplier_B        = ( cosAngle * attenuation );                                                                                     \n"+
"            total_R                   = max( multiplier_R, total_R );                                                                                   \n"+
"            total_G                   = max( multiplier_G, total_G );                                                                                   \n"+
"            total_B                   = max( multiplier_B, total_B );                                                                                  \n "+
"            rgb                       = color;                                                                                                         \n "+
"        }                                                                                                                                              \n "+
"        vec4 color    = texture2D( texSampler, texCoords );                                                                                            \n "+
"             color.r = clamp( ( color.r * ( total_R )  ), 0.0, 1.0 ); ;                                                                                \n "+
"             color.g = clamp( ( color.g * ( total_G )  ), 0.0, 1.0 ); ;                                                                                 \n"+
"             color.b = clamp( ( color.b * ( total_B )  ), 0.0, 1.0 ); ;                                                                                \n "+
"    gl_FragColor  = color;                                                                                                                             \n "+
"    }                                                                                                                                                    ",













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
        
                 shaderProgram.lightCnt      = gl.getUniformLocation(shaderProgram, "lightCnt"          );
                                               gl.uniform1i( shaderProgram.lightCntUniform , lightCnt   );    
                                           
                 shaderProgram.lColors       = gl.getUniformLocation(shaderProgram, "lColors"           );
                                               gl.uniform3fv( shaderProgram.lColorsUniform , colArray   );    
                }
       
                var eyePos = camera.get_Position();
                shaderProgram.eyePositionUniform  = gl.getUniformLocation(shaderProgram, "eyePosition"    );
                                                    gl.uniform1i( shaderProgram.eyePositionUniform , [eyePos.x,eyePos.y,eyePos.z]    );   
    },



    load : function() 
    {   
     console.info( Shader1.VERTEX_SHADER );
   
    }

    
};