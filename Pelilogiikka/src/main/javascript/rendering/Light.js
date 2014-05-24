




function Light( position , radius, ambient_Color, diffuse_Color, specular_Color, attenuation_Constant, attenuation_Linear, attenuation_Quadratic ) 
{
    this.position     = position; // Use this for now. Convert to orientation later.
    this.radius       = radius;
    this.colors       = [ ambient_Color, diffuse_Color, specular_Color ];
    this.attenuations = [ attenuation_Constant, attenuation_Linear, attenuation_Quadratic ];
    
}

