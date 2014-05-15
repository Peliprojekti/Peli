    // LOLZ XXX
    
    
    function Renderer( canvas )
    {
        this.gl     = null;
        this.camera = null;
        
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
      
      
     this.gl.enable(this.gl.DEPTH_TEST);                /// ELSEWHERE!
     this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE); //  ANYWHERE ELSE!  
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


    Renderer.prototype.draw = function(  myEntity  )
    {
        
        var shaderProgram = myEntity.material.shader.shaderProgram;
        var worldMatrix   = myEntity.get_Transformation();       
        var viewMatrix    = this.camera.get_ViewMatrix(); 
           
        var worldViewMatrix =  mat4.multiply( viewMatrix , worldMatrix  );
     
        myEntity.material.bind( this.gl, this.gl.TEXTURE0 );
      
        this.gl.uniformMatrix4fv( shaderProgram.pMatrixUniform , false,  this.projection_Matrix);
        this.gl.uniformMatrix4fv( shaderProgram.mvMatrixUniform, false,  worldViewMatrix      );
        
        myEntity.mesh.vertices.bind ( this.gl, myEntity.material.shader.shaderProgram.vertexPositionAttribute );    
        myEntity.mesh.texCoords.bind( this.gl, myEntity.material.shader.shaderProgram.textureCoordAttribute   );
                                                  
        
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, myEntity.mesh.indices.data );    
        this.gl.drawElements(this.gl.TRIANGLES, myEntity.mesh.indices.data.numItems, this.gl.UNSIGNED_SHORT, 0);
     }
     
     
     
     Renderer.prototype.draw_SS = function( myEntity ) 
     {
        var shaderProgram   = myEntity.material.shader.shaderProgram;
        var worldViewMatrix = myEntity.get_Transformation();
     
        myEntity.material.bind( this.gl, this.gl.TEXTURE0 );
      
        this.gl.uniformMatrix4fv( shaderProgram.pMatrixUniform , false,  this.projection_Matrix);
        this.gl.uniformMatrix4fv( shaderProgram.mvMatrixUniform, false,  worldViewMatrix      );
        
        myEntity.mesh.vertices.bind ( this.gl, myEntity.material.shader.shaderProgram.vertexPositionAttribute );    
        myEntity.mesh.texCoords.bind( this.gl, myEntity.material.shader.shaderProgram.textureCoordAttribute   );
                                                  
        
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, myEntity.mesh.indices.data );    
        this.gl.drawElements(this.gl.TRIANGLES, myEntity.mesh.indices.data.numItems, this.gl.UNSIGNED_SHORT, 0);
         
         
     }
     
     
     
     
     
     Renderer.prototype.begin_Blending = function()
     {
         this.disable_ZBuffer();
         this.gl.enable(this.gl.BLEND);
     }
     
     Renderer.prototype.end_Blending = function()
     {
         this.enable_ZBuffer();
         this.gl.disable(this.gl.BLEND);
     }
     
     
     Renderer.prototype.enable_ZBuffer = function()
     {
         this.gl.enable(this.gl.DEPTH_TEST);        /// ELSEWHERE!
     }
     
     
     Renderer.prototype.disable_ZBuffer = function()
     {
         this.gl.disable(this.gl.DEPTH_TEST);        /// ELSEWHERE!
     }
     
     Renderer.prototype.bind_Camera = function( cam )
     {
         if( !cam ) alert(" Invalid camera bound! ");
         
         this.camera = cam;
     }