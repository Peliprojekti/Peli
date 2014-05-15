    // LOLZ XXX
    
    
    function Renderer( canvas )
    {
        this.gl = null;
        
        try 
        {
            this.gl                = canvas.getContext("experimental-webgl");  // Wtf is the point of this label!?
            this.gl.viewportWidth  = canvas.width;
            this.gl.viewportHeight = canvas.height;
        } 
        catch (e) 
        {
            alert("Failed to initialize GL: " + e.message);
        }
        
        if( !this.gl ) message("Fatal error creating renderer");
       
       
     this.fillColor = [0.0,1.0,0.0,1.0];
     
     // These two belong into a separate CAMERA class!
     // Declare projection matrix
     this.projection_Matrix = mat4.create();
     mat4.identity( this.projection_Matrix );
     // Declare view matrix
     this.view_Matrix       = mat4.create();
     mat4.identity( this.view_Matrix       );
      
      
       this.gl.enable(this.gl.DEPTH_TEST);
    }


    Renderer.prototype.begin = function()
    {
        this.gl.viewport  ( 0, 0, this.gl.viewportWidth, this.gl.viewportHeight                     );
        this.gl.clearColor( this.fillColor[0],this.fillColor[1],this.fillColor[2],this.fillColor[3] );
        this.gl.clear     ( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT                     );
        
        // Grab from camera!
        mat4.perspective(45, this.gl.viewportWidth / this.gl.viewportHeight, 0.1, 100.0, this.projection_Matrix);
    }



    Renderer.prototype.end = function()
    {
        // Postprocessing here
    }


    Renderer.prototype.draw_Scene = function(  myEntity, myCamera   )
    {
        var shaderProgram = myEntity.material.shader.shaderProgram;
      
        // Pass the matrices to the GPU
        
        var worldMatrix = myEntity.get_Transformation();// myEntity.get_WorldTransformation();         
        var viewMatrix  = myCamera.get_ViewMatrix(); 
           
           
        var worldViewMatrix =  mat4.multiply( viewMatrix , worldMatrix  );
      
        this.gl.uniformMatrix4fv( shaderProgram.pMatrixUniform , false,  this.projection_Matrix);
        this.gl.uniformMatrix4fv( shaderProgram.mvMatrixUniform, false,  worldViewMatrix      );

        // Render the entity
        myEntity.draw( this.gl , this.view_Matrix );
        
        this.end();
     }
     
     
