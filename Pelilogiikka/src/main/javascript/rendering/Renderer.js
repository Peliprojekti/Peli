

    
    
    function Renderer( resolution )
    {
        ASSERT_SINGLETON( the_Renderer, "Global renderer can only ever be assigned once!" );
        
        try
        {   
            this.canvas = document.getElementById("Canvas");
            this.gl     = this.canvas.getContext("experimental-webgl"); 
            
            if( VALID( resolution ) )
            {
                this.canvas.width  = resolution.width;
                this.canvas.height = resolution.height;
            }
           
        this.size = new Dimension2( this.canvas.width, this.canvas.height );
        }
        catch( error )
        {
            throw new Exception( Exception.Type.FATAL, error.message );
        }
        
        
        
     this.aspectRatio   = this.canvas.width/this.canvas.height;
     this.fillColor     = new Color( 0.2 , 0.6, 0.7, 1.0 );
    
     this.gl.enable( this.gl.DEPTH_TEST );      
     
     
     
 //    this.gl.frontFace ( this.gl.CW         );
 //    this.gl.enable    ( this.gl.CULL_FACE  );
 //    this.gl.cullFace  ( this.gl.BACK       );
        
        
         this.worldMatrix = new Matrix44();
         this.viewMatrix  = new Matrix44();
         this.projMatrix  = new Matrix44();
         this.shader      = null;
         this.camera      = null;
         
         
        
    the_Renderer   = this;  
    }


    Renderer.prototype.begin = function()
    {
        this.gl.viewport(   0                    ,      
                            0                    ,
                            this.size.width      ,  
                            this.size.height     );
        
        this.gl.clearColor( this.fillColor.red   ,
                            this.fillColor.green ,
                            this.fillColor.blue  ,
                            this.fillColor.alpha );
        
        this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );
        
        
        this.viewMatrix = this.camera.get_ViewMatrix();
        this.projMatrix = this.camera.get_ProjectionMatrix();
    }   





    Renderer.prototype.draw_Batch = function( batch ) 
    {
        batch.bind( this.shader );
        
        this.gl.uniformMatrix4fv( this.shader.program.worldMatrix      , false ,       this.worldMatrix.data );
        this.gl.uniformMatrix4fv( this.shader.program.viewMatrix       , false ,       this.viewMatrix.data  );
        this.gl.uniformMatrix4fv( this.shader.program.projectionMatrix , false ,       this.projMatrix.data  );
 
        this.gl.drawElements( this.gl.TRIANGLES, batch.iBuffer.data.numItems, this.gl.UNSIGNED_SHORT, 0  );
    }


    
    



    Renderer.prototype.set_Matrices = function( world, view, proj )
    {
        if( VALID( world ) ) this.worldMatrix = world;
        if( VALID( view  ) ) this.viewMatrix  = view;
        if( VALID( proj  ) ) this.projMatrix  = proj;
    }
    
    
    Renderer.prototype.set_Shader = function( shader )
    {
        ASSERT_VALID( shader );
        this.shader = shader;
        this.shader.enable();
    }
    
    
    Renderer.prototype.set_Camera = function( camera )
    {
        ASSERT_VALID( camera );
        this.camera = camera;
    }
    


    
