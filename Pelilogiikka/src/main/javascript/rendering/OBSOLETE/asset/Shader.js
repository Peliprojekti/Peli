    
    
    function ShaderTemplate( shader_Initializer, shader_Binder )
    {
        this.initializer = shader_Initializer;
        this.binder      = shader_Binder;
    }
    
    function ShaderFeatures( mappings )    
    {
        if( mappings[0] == "NORMAL") this.normal_Map = true;
        else
            this.normal_Map   = false;
        
        if( mappings[1] == "PARALLAX") this.parallax_Map = true;
        else
            this.parallax_Map   = false;
    }
 
    
    Shader.prototype.getShader = function( gl, shaderText, type ) 
    {  
        if (!shaderText) 
        {
            alert(" NULL script shader! - ABORT - ");
            return null;
        }
        
        var shader;
        
        if( type == "VERTEX_SHADER" ) shader = gl.createShader(gl.VERTEX_SHADER);
        else
            if( type == "PIXEL_SHADER") shader = gl.createShader( gl.FRAGMENT_SHADER );
            
        gl.shaderSource(shader, shaderText);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) 
        {
            alert( gl.getShaderInfoLog("ERROR " + shader) );
            return null;
        }

    return shader;
    }


    Shader.prototype.build_Shader = function( gl, vs_Text, ps_Text )
    {
        var fragmentShader  = this.getShader( gl, ps_Text, "PIXEL_SHADER");
        var vertexShader    = this.getShader( gl, vs_Text, "VERTEX_SHADER");
        var shaderProgram   = gl.createProgram();
	
        gl.attachShader( shaderProgram, vertexShader         );
        gl.attachShader( shaderProgram, fragmentShader       );	
        gl.linkProgram ( shaderProgram                       );

        if (!gl.getProgramParameter( shaderProgram, gl.LINK_STATUS) ) 
        {
            alert("Could not load shader!");
        }
        
    return shaderProgram;
    }
    
    function Shader( gl, vs_Program, ps_Program, features, template )
    {
        this.features       = features;                               
        this.template       = template;                   
        this.shaderProgram  = this.build_Shader( gl, vs_Program, ps_Program ); 
        
        gl.useProgram( this.shaderProgram );       
        this.template.initializer( gl , this.shaderProgram );    
    }
    
    Shader.prototype.bind = function( gl , tex1, tex2, tex3, tex4, lights, camera )
    {
        this.template.binder( gl, this.shaderProgram, this.features, tex1, tex2, tex3, tex4, lights, camera );
        gl.useProgram( this.shaderProgram );        
    }