

    
    function Camera( position )     
    {
      this.position     = position;
      this.orientiation = mat3.create();
                          mat3.identity( this.orientation );                  
    }



    Camera.prototype.get_ViewMatrix = function()
    {    
       var inverse_Origin = mat3.transpose();
            
       return inverse_Origin;
    }