


function Camera( position ) 
{
    this.position     = position;
    this.orientiation = mat4.create();
                        mat4.identity( this.orientation );                  
}