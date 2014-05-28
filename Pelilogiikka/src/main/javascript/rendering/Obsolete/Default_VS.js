
    
    // Transformation marices
    uniform mat4 worldViewMatrix;         
    uniform mat4 projMatrix;
    uniform mat4 worldMatrix;
   
    // Declare the light rack
    uniform vec3   lights[32];   // X,Y,Z @ world space  
    uniform vec3  lColors[32];   // Red, Green, Blue
    uniform vec3   lAtten[32];   // Constant term, Linear term, Quadratic term
    uniform  int     lightCnt;
   
    uniform vec3  eyePosition;
    
    
    // Vertex attributes
    attribute vec3    vertexPos;
    attribute vec2    vertexUV;
    
    attribute vec3    vertexNormal;
    attribute vec3    vertexBinormal;
    attribute vec3    vertexTangent;
    
    // Parameters for pixel shader
    varying   vec4  fragmentPos;
    varying   vec2  fragmentUV;
    
    varying   vec3  surfaceNormal;    
    varying   vec3  surfaceBinormal;
    varying   vec3  surfaceTangent;
    
    void main(void) 
    {
        fragmentUV      = vertexUV;
        fragmentPos     = worldMatrix * vec4( vertexPos , 1.0 );                   // Needs to be taken from model space to world space.
        
        // These seem correct
        vec4      sN4   = normalize( worldMatrix * vec4( vertexNormal   , 0.0 ) );  // Inverse transpose required if nonuniform scale.
        vec4      sB4   = normalize( worldMatrix * vec4( vertexBinormal , 0.0 ) ); 
        vec4      sT4   = normalize( worldMatrix * vec4( vertexTangent  , 0.0 ) ); 
        
        surfaceTangent  = vec3( sT4.x, sT4.y, sT4.z );
        surfaceBinormal = vec3( sB4.x, sB4.y, sB4.z );
        surfaceNormal   = vec3( sN4.x, sN4.y, sN4.z );
        
        
      //  surfaceTangent  = vec3(1.0,0.0,0.0);
      //  surfaceBinormal = vec3(0.0,1.0,0.0);
        //surfaceNormal   = vec3(0.0,0.0,-1.0);
        
        
        //surfaceTangent  = cross( surfaceNormal ,  surfaceBinormal );
        // These seem correct
        // BUT WHY?! How the hell is the handedness going here anyhow?
        
    gl_Position    = projMatrix * worldViewMatrix * vec4(vertexPos, 1.0);
    }
    
