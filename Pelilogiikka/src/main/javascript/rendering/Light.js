




    function Light( position , radius, ambient_Color, diffuse_Color, specular_Color, attenuation_Constant, attenuation_Linear, attenuation_Quadratic ) 
    {
       this.orientation  = new Orientation( [position.x,position.y,position.z], [1,1,1], [0,0,0] );
    
        this.position     = position; // Use this for now. Convert to orientation later.
        this.radius       = radius;
        this.colors       = [ ambient_Color, diffuse_Color, specular_Color ];
        this.attenuations = [ attenuation_Constant, attenuation_Linear, attenuation_Quadratic ];
    }



    // REFACTOR THIS BULLSHIT

    Light.prototype.forward = function( units )
    {
        var dir = this.orientation.get_Vector( "LOOK" );
            dir = dir.mul( -units );                            // Right handed -> negative Z is look                   
        this.orientation.displace( [dir.x,dir.y,dir.z] );
    };
  
    Light.prototype.backward = function( units )
    {
        var dir = this.orientation.get_Vector( "LOOK" );
            dir = dir.mul( units );
        this.orientation.displace( [dir.x,dir.y,dir.z] );
    }
    
    Light.prototype.move = function( displacement )
    { 
        this.orientation.displace( displacement );
    };