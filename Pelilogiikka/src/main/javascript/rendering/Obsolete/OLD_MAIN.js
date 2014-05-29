<html>

<head>
    <title>Pelumoottori<SIC> </title>
    
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">

<script type="text/javascript" src="glMatrix.js"               ></script>
<script type="text/javascript" src="External/webglutils.js"    ></script>

<script type="text/javascript" src="Renderer.js"               ></script>
<script type="text/javascript" src="Shader.js"                 ></script>
<script type="text/javascript" src="Inputs.js"                 ></script>
<script type="text/javascript" src="Scene.js"                  ></script>

<script type="text/javascript" src="Material.js"               ></script>
<script type="text/javascript" src="Texture.js"                ></script>

<script type="text/javascript" src="Buffer.js"                 ></script>
<script type="text/javascript" src="Model.js"                   ></script>
<script type="text/javascript" src="Mesh.js"                   ></script>
<script type="text/javascript" src="Light.js"                  ></script>


<script type="text/javascript" src="Guiobject.js"              ></script>
<script type="text/javascript" src="Entity.js"                 ></script>
<script type="text/javascript" src="Camera.js"                 ></script>

<script type="text/javascript" src="parser/Parserobjects.js"         ></script>
<script type="text/javascript" src="parser/GeneralPurposeParser.js"  ></script>

<script type="text/javascript" src="math/Angles.js"            ></script>
<script type="text/javascript" src="math/Vector2.js"           ></script>
<script type="text/javascript" src="math/Vector3.js"           ></script>
<script type="text/javascript" src="math/Matrix33.js"          ></script>
<script type="text/javascript" src="math/Matrix44.js"          ></script>
<script type="text/javascript" src="math/MatrixGL.js"          ></script>
<script type="text/javascript" src="math/Orientation.js"       ></script>
<script type="text/javascript" src="math/Interpolator.js"      ></script>

<script type="text/javascript" src="Assetmanager.js"           ></script>
<script type="text/javascript" src="testCube.js"               ></script>


// NEXT GENERATION HERE
<script type="text/javascript" src="Refactored/Shaderutils2.js"                 ></script>
<script type="text/javascript" src="Refactored/Shader2.js"                 ></script>




// External shader test
<script src="data/Test_Vertexshader.js" type="VERTEX_SHADER"></script>




<script id="vertex_Shader" type="x-shader/x-vertex">
    
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
    
</script>



   

<script id="pixel_Shader" type="x-shader/x-fragment">
    precision mediump float;

   // Declare the light rack
    uniform vec3   lights[32];   // X,Y,Z @ world space  
    uniform vec3  lColors[32];   // Red, Green, Blue
    uniform vec3   lAtten[32];   // Constant term, Linear term, Quadratic term
    uniform  int     lightCnt;

    uniform vec3  eyePosition;   // This is where the camera is located


    uniform sampler2D       texSampler;
    uniform sampler2D    normalSampler;
    uniform sampler2D      dispSampler;
    
    
    varying   vec4         fragmentPos;       // Contains the fragment world position in VIEW_SPACE
    varying   vec2          fragmentUV;
    varying   vec3       surfaceNormal;
    varying   vec3     surfaceBinormal;
    varying   vec3      surfaceTangent;
    
    
    void main(void) 
    {
          vec2 texCoords      = vec2(fragmentUV.s, fragmentUV.t);
          vec3 fragPos        = vec3(fragmentPos);
        /*  
        vec3 eyeToPixel     = fragPos - eyePosition;
             eyeToPixel       = normalize( eyeToPixel );
         // Get the displacement here
   
              eyeToPixel      = eyeToPixel.x * surfaceTangent + eyeToPixel.y * surfaceBinormal + eyeToPixel.z * surfaceNormal;
              eyeToPixel.x   /= eyeToPixel.z;
              eyeToPixel.y   /= eyeToPixel.z;
              
              
              // Now we have the vector, lets multiply it with weights
              float weight    = 10.0;
              vec2   shift    = vec2( eyeToPixel.x, eyeToPixel.y) * texture2D( dispSampler, vec2(texCoords.x, texCoords.y*-1.0) ).r * weight;
                     shift   *= 1.0/512.0;
             //    texCoords     += shift;
          */    
         // Grab the per fragment normal from the associated map
              // Not working properly. Disable for now
          vec4 fragVector     = texture2D( normalSampler, texCoords );    // This should hopefully contain the normal [x,y,z,0] in its own space
               fragVector    *= 2.0;
               fragVector    -= vec4( 1.0,1.0,1.0,0.0);                   // Convert the encoded normal [0,1] to [-1,-1]
            
          vec3 tNormal        = fragVector.x * surfaceTangent + fragVector.y * surfaceBinormal + fragVector.z * surfaceNormal;
        
          float total_R       = 0.0;                     // ATTENTION. Colored lights require component wise operation! This is for white light only!
          float total_G       = 0.0;
          float total_B       = 0.0;
        
          vec3 rgb;
       
        // Generate the illumination for each light. Highest scalars win.
        for( int i = 0; i < 16; i++ )  // Arbitrarily large index to scam the shader into "infinite" loop. Thx glsl for being flexible.
        {
            if( i == lightCnt ) break;
            
            vec3 light                = lights[i];
            vec3 color                = lColors[i];
            
            vec3 pixelToLight         = light - fragPos;    // Vector from pixel to light source
            vec3 lightVector          = normalize( pixelToLight );
            float dist2Light          = length( pixelToLight );         // Could be optimized....
             
            float cosAngle            = dot( lightVector , tNormal ); 
                  cosAngle            = clamp( cosAngle, 0.0, 1.0 );
              
            float constant_Term       = 0.5;
            float linear_Term         = 0.010;
            float quadratic_Term      = 0.00005;
            float attenuation         = 1.0 / ( constant_Term + dist2Light*linear_Term + dist2Light*dist2Light*quadratic_Term );
            
            float multiplier_R        = ( cosAngle * attenuation );
            float multiplier_G        = ( cosAngle * attenuation );
            float multiplier_B        = ( cosAngle * attenuation );
            
            total_R                   = max( multiplier_R, total_R );
            total_G                   = max( multiplier_G, total_G );
            total_B                   = max( multiplier_B, total_B );
            
            rgb                       = color;
        }
        
            
           
      
        vec4 color    = texture2D( texSampler, texCoords );   // Diffuse
        
             color.r = clamp( ( color.r * ( total_R )  ), 0.0, 1.0 ); ;
             color.g = clamp( ( color.g * ( total_G )  ), 0.0, 1.0 ); ;
             color.b = clamp( ( color.b * ( total_B )  ), 0.0, 1.0 ); ;
        
    gl_FragColor  = color;
    }
</script>

        
        
        


<script id="HAX_VS" type="x-shader/x-vertex">
      
    uniform mat4 worldMatrix;
        
    attribute vec3     vertexPos;
    attribute vec2      vertexUV;
    varying   vec2    fragmentUV;
     
    void main(void) 
    {
        fragmentUV    = vertexUV;
        gl_Position   = worldMatrix * vec4(vertexPos, 1.0);
       
    }
</script>


<script id="COLOR_PS" type="x-shader/x-fragment">
    
    precision mediump           float;
    varying vec2           fragmentUV;
    uniform sampler2D      texSampler;
    //uniform vec4               vColor;
    
    
    void main(void) 
    {
        vec4 texel = texture2D( texSampler, vec2(fragmentUV.s, fragmentUV.t));
      
        if( texel.r == 1.0 && texel.g == 0.0 && texel.b == 1.0 ) discard;
     
        gl_FragColor = texture2D( texSampler, fragmentUV );   // Diffuse
    }
</script>








<script type="text/javascript">

    var renderer   = null;    
    var myCamera   = null;
    var myScene    = null;


    var haxLight   = new Light( new Vector3(-64.297035 , -34.088657 , -117.10157), 100.0, 0, 0, 0, 0, 0, 0 );
    
    
    
    // Define these
    KEY_W = 87;
    KEY_S = 83;
      
    KEY_Q = 81;
    KEY_E = 69;
    
    KEY_UP   = 38;
    KEY_DOWN = 40;
     
    KEY_LEFT = 37;
    KEY_RIGHT = 39;
    
    KEY_PAGEUP   = 33;
    KEY_PAGEDOWN = 34;
     
      
    KEY_ENTER = 13;
     
    function tick() 
    {   
        requestAnimFrame( tick );
          
         
        if(  key_Down( KEY_W ) )   myCamera.pitch( 0.008 );        // W to pitch up
        if(  key_Down( KEY_S ) )   myCamera.pitch( -0.008 );      // S to pitch down
         
        if(  key_Down( KEY_Q ) )   myCamera.roll( 0.008 );       // Q to roll left
        if(  key_Down( KEY_E ) )   myCamera.roll( -0.008 );      // E to roll right
         
            
        if( key_Down( 16) ) // Shift
        {
            if( key_Down( KEY_UP   ) )   haxLight.forward(  1.0 );
            if( key_Down( KEY_DOWN ) )   haxLight.backward( 1.0 );

            if( key_Down( KEY_PAGEUP ) )   haxLight.move([0,1,0]);
            if( key_Down( KEY_PAGEDOWN ) )   haxLight.move([0,-1,0]);
             
            if( key_Down( KEY_LEFT ) )   haxLight.move([1,0,0]);
            if( key_Down( 39 ) )   haxLight.move([-1,0,0]);
            
        }
        else
            {
                if( key_Down( KEY_UP   ) )   myCamera.forward(  1.0 );
                if( key_Down( KEY_DOWN ) )   myCamera.backward( 1.0 );

                if( key_Down( KEY_PAGEUP ) )   myCamera.move([0,1,0]);
                if( key_Down( KEY_PAGEDOWN ) )   myCamera.move([0,-1,0]);
                
                if( key_Down( KEY_LEFT ) )   myCamera.yaw( -0.05  );
                if( key_Down( KEY_RIGHT ) )   myCamera.yaw(  0.05 );
   
            }
         
         
        // Snap testlight to cam position
        if( key_Down( KEY_ENTER ) )
        {    
           // var vec3 = 
              var vec  = myCamera.orientation.get_Position();
              haxLight.orientation.set_Position( [vec.x,vec.y,vec.z] );
            //myCamera.forward(  1.0 );
        }
         
         
        myScene.render();
    }
    
       
    function Map_To_Screen( renderer , hPoint )
    {
       var w2 = renderer.target_Width  / 2;
       var h2 = renderer.target_Height / 2;
       var x  =  ( hPoint[0] - w2  )   / w2;
       var y  =  (  h2 - hPoint[1] )   / h2; 
       return [x,y,0];
    }
    
       
    function register_Inputs()
    {
        document.onkeydown = kbDown_Event;
        document.onkeyup   = kbUp_Event; 
    }
       
    
    
    function resize( canvas )
    {
        // 1080p
        canvas.width  = 1920;//window.outerWidth;
        canvas.height = 1080;//window.outerHeight;
    }

    
    
    
 
    function Start() 
    {
       var canvas          = document.getElementById("Canvas");
       
       resize( canvas );
        
       renderer            = new Renderer( canvas );
       var assman          = new Assetmanager( renderer );
        
       myScene             = new Scene( renderer, assman, "Showcase" ); 
       
       register_Inputs();      // Erillinen luokka t�lle!
    
       myCamera            = new   Camera( renderer, 0.1, 1000, 65        );
       
       myCamera.set_Position ( [-2.750824,0.444516,-24.011581]  );
       myScene.insert        ( myCamera      , "CAM"            );
       myScene.insert        ( haxLight      , "LIGHT"          );
       renderer.set_BgrColor ( [0.0,0.4,0.7,1.0]                );
       
       
    tick();   
    }

    
</script>




</head>



<body onload="Start();">
   
    <canvas id="Canvas" style="border: none;" width="1000" height="1000"></canvas>

    <br/>  
</body>

</html>
