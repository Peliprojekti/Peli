// This is an example file that shows how shaders are described from now on.

// Start by declaring namespace that has the same name as the filename.
var Shader1 = 
{

   VERTEX_SHADER : " // Transformation marices                                                                "+
"    uniform mat4 worldViewMatrix;                                                                            "+
"    uniform mat4 projMatrix;                                                                                 "+
"    uniform mat4 worldMatrix;                                                                                "+   
"                                                                                                             "+   
"    // Declare the light rack                                                                                "+
"    uniform vec3   lights[32];   // X,Y,Z @ world space                                                      "+
"    uniform vec3  lColors[32];   // Red, Green, Blue                                                         "+ 
"    uniform vec3   lAtten[32];   // Constant term, Linear term, Quadratic term                               "+ 
"   uniform  int     lightCnt;                                                                                "+ 
"                                                                                                             "+ 
"    uniform vec3  eyePosition;                                                                               "+ 
"                                                                                                             "+
"                                                                                                             "+
"    // Vertex attributes                                                                                     "+ 
"    attribute vec3    vertexPos;                                                                             "+ 
"    attribute vec2    vertexUV;                                                                              "+ 
"                                                                                                             "+ 
"    attribute vec3    vertexNormal;                                                                          "+ 
"    attribute vec3    vertexBinormal;                                                                        "+ 
"    attribute vec3    vertexTangent;                                                                         "+ 
"                                                                                                             "+ 
"    // Parameters for pixel shader                                                                           "+ 
"    varying   vec4  fragmentPos;                                                                             "+ 
"    varying   vec2  fragmentUV;                                                                              "+ 
"                                                                                                             "+ 
"    varying   vec3  surfaceNormal;                                                                           "+ 
"    varying   vec3  surfaceBinormal;                                                                         "+ 
"    varying   vec3  surfaceTangent;                                                                          "+ 
"                                                                                                             "+ 
"    void main(void)                                                                                          "+ 
"    {                                                                                                        "+
"        fragmentUV      = vertexUV;                                                                          "+ 
"        fragmentPos     = worldMatrix * vec4( vertexPos , 1.0 );                                             "+                                         
"                                                                                                                                                 "+ 
"        // These seem correct                                                                                                                    "+ 
"        vec4      sN4   = normalize( worldMatrix * vec4( vertexNormal   , 0.0 ) );  // Inverse transpose required if nonuniform scale.           "+                                                                          
"        vec4      sB4   = normalize( worldMatrix * vec4( vertexBinormal , 0.0 ) );                                                               "+ 
"        vec4      sT4   = normalize( worldMatrix * vec4( vertexTangent  , 0.0 ) );                                                               "+ 
"                                                                                                                                                 "+ 
"        surfaceTangent  = vec3( sT4.x, sT4.y, sT4.z );                                                                                           "+ 
"        surfaceBinormal = vec3( sB4.x, sB4.y, sB4.z );                                                                                           "+ 
"        surfaceNormal   = vec3( sN4.x, sN4.y, sN4.z );                                                                                           "+ 
"                                                                                                                                                 "+ 
"                                                                                                                                                 "+ 
"      //  surfaceTangent  = vec3(1.0,0.0,0.0);                                                                                                   "+ 
"      //  surfaceBinormal = vec3(0.0,1.0,0.0);                                                                                                   "+                                                                         
"        //surfaceNormal   = vec3(0.0,0.0,-1.0);                                                                                                  "+ 
"                                                                                                                                                 "+ 
"                                                                                                                                                 "+ 
"        //surfaceTangent  = cross( surfaceNormal ,  surfaceBinormal );                                                                           "+ 
"        // These seem correct                                                                                                                    "+ 
"        // BUT WHY?! How the hell is the handedness going here anyhow?                                                                           "+ 
"                                                                                                                                                 "+ 
"    gl_Position    = projMatrix * worldViewMatrix * vec4(vertexPos, 1.0);                                                                        "+ 
"    }                                                                                                                                            ",
 




PIXEL_SHADER  : "                                                                                                                                 "+
"                                                                                                                                                 "+
"                                                                                                                                                 "+
"                                                                                                                                                 "+
"   precision mediump float;                                                                                                                      "+
"                                                                                                                                                 "+
"   // Declare the light rack                                                                                                                     "+
"    uniform vec3   lights[32];   // X,Y,Z @ world space                                                                                          "+  
"    uniform vec3  lColors[32];   // Red, Green, Blue                                                                                             "+
"    uniform vec3   lAtten[32];   // Constant term, Linear term, Quadratic term                                                                   "+
"    uniform  int     lightCnt;                                                                                                                   "+
"                                                                                                                                                 "+
"    uniform vec3           eyePosition;   // This is where the camera is located                                                                 "+                                                                          
"                                                                                                                                                 "+
"    uniform sampler2D       texSampler;                                                                                                          "+
"    uniform sampler2D    normalSampler;                                                                                                          "+
"    uniform sampler2D      dispSampler;                                                                                                          "+
"                                                                                                                                                 "+
"    varying   vec4         fragmentPos;       // Contains the fragment world position in VIEW_SPACE                                              "+
"    varying   vec2          fragmentUV;                                                                                                          "+
"    varying   vec3       surfaceNormal;                                                                                                          "+
"    varying   vec3     surfaceBinormal;                                                                                                          "+
"    varying   vec3      surfaceTangent;                                                                                                          "+
"                                                                                                                                                 "+
"    void main(void)                                                                                                                              "+
"    {                                                                                                                                            "+
"          vec2 texCoords      = vec2(fragmentUV.s, fragmentUV.t);                                                                                "+
"          vec3 fragPos        = vec3(fragmentPos);                                                                                               "+
"                                                                                                                                                  "+   
"          vec4 fragVector     = texture2D( normalSampler, texCoords );    // This should hopefully contain the normal [x,y,z,0] in its own space  "+
"               fragVector    *= 2.0;                                                                                                              "+
"               fragVector    -= vec4( 1.0,1.0,1.0,0.0);                   // Convert the encoded normal [0,1] to [-1,-1]                            "+
"                                                                                                                                                      "+
"          vec3 tNormal        = fragVector.x * surfaceTangent + fragVector.y * surfaceBinormal + fragVector.z * surfaceNormal;                          "+
"                                                                                                                                                        "+
"          float total_R       = 0.0;                     // ATTENTION. Colored lights require component wise operation! This is for white light only!   "+                                                                                                                                            
"          float total_G       = 0.0;                                                                                                                    "+
"          float total_B       = 0.0;                                                                                                                    "+
"                                                                                                                                                           "+
"          vec3 rgb;                                                                                                                                          "+
"                                                                                                                                                              "+  
"        // Generate the illumination for each light. Highest scalars win.                                                                                     "+
"        for( int i = 0; i < 16; i++ )  // Arbitrarily large index to scam the shader into infinite loop. Thx glsl for being flexible.                          "+                                                                                                                    
"        {                                                                                                                                                      "+
"            if( i == lightCnt ) break;                                                                                                                          "+
"                                                                                                                                                                "+
"            vec3 light                = lights[i];                                                                                                               "+
"            vec3 color                = lColors[i];                                                                                                              "+
"                                                                                                                                                                 "+
"            vec3 pixelToLight         = light - fragPos;    // Vector from pixel to light source                                                                 "+
"            vec3 lightVector          = normalize( pixelToLight );                                                                                               "+
"            float dist2Light          = length( pixelToLight );         // Could be optimized....                                                                "+
"                                                                                                                                                                 "+
"            float cosAngle            = dot( lightVector , tNormal );                                                                                            "+
"                  cosAngle            = clamp( cosAngle, 0.0, 1.0 );                                                                                             "+
"                                                                                                                                                                 "+
"            float constant_Term       = 0.5;                                                                                                                     "+
"            float linear_Term         = 0.010;                                                                                                                   "+
"            float quadratic_Term      = 0.00005;                                                                                                                 "+
"            float attenuation         = 1.0 / ( constant_Term + dist2Light*linear_Term + dist2Light*dist2Light*quadratic_Term );                                 "+
"                                                                                                                                                                 "+
"            float multiplier_R        = ( cosAngle * attenuation );                                                                                              "+
"            float multiplier_G        = ( cosAngle * attenuation );                                                                                                 "+
"            float multiplier_B        = ( cosAngle * attenuation );                                                                                                  "+
"                                                                                                                                                                     "+
"            total_R                   = max( multiplier_R, total_R );                                                                                                "+
"            total_G                   = max( multiplier_G, total_G );                                                                                                "+
"            total_B                   = max( multiplier_B, total_B );                                                                                                "+
"                                                                                                                                                                     "+
"            rgb                       = color;                                                                                                                       "+
"        }                                                                                                                                                            "+
"                                                                                                                                                                     "+
"                                                                                                                                                                     "+
"                                                                                                                                                                       "+
"                                                                                                                                                                         "+
"        vec4 color    = texture2D( texSampler, texCoords );   // Diffuse                                                                                                   "+
"                                                                                                                                                                            "+
"             color.r = clamp( ( color.r * ( total_R )  ), 0.0, 1.0 ); ;                                                                                                     "+
"             color.g = clamp( ( color.g * ( total_G )  ), 0.0, 1.0 ); ;                                                                                                     "+
"             color.b = clamp( ( color.b * ( total_B )  ), 0.0, 1.0 ); ;                                                                                                      "+
"                                                                                                                                                                             "+
"    gl_FragColor  = color;                                                                                                                                                  "+
"    }                                                                                                                                                                       ",













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
     
   
    }

    
};