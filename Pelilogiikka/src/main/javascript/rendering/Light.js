




function Light( position , radius, ambient_Color, diffuse_Color, specular_Color, attenuation_Constant, attenuation_Linear, attenuation_Quadratic ) 
{
    this.orientation = new Orientation( position, [1,1,1], [0,0,0] );

    this.radius       = radius;
    this.colors       = [ ambient_Color, diffuse_Color, specular_Color ];
    this.attenuations = [ attenuation_Constant, attenuation_Linear, attenuation_Quadratic ];
    
}

