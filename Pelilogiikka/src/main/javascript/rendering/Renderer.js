

    
    
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
        
     this.fillColor = new Color( 1.0 , 0.0, 1.0, 1.0 );
    
     this.gl.enable    ( this.gl.DEPTH_TEST );      
     
 //    this.gl.frontFace ( this.gl.CW         );
 //    this.gl.enable    ( this.gl.CULL_FACE  );
 //    this.gl.cullFace  ( this.gl.BACK       );
        
        
        
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
    }   



    Renderer.prototype.end = function()
    {
        
    }



    Renderer.prototype.draw_Batch = function( batch, shader, camera ) 
    {
        // TEST STUFF
        var rot = new Matrix33();
        var sca = new Matrix33();
            sca.Scale( new Vector3( 10,10,10) );
            
            rot = rot.multiply( sca );
        
            var world      = new Matrix44();
                world.embed( rot );
                
            var view       = camera.get_ViewMatrix();
            var project    = camera.get_ProjectionMatrix(  45, 800/600, 1, 1000 );
        // TEST STUFF
        
        
        
        
        batch.bind( shader );
        shader.enable();
        this.gl.uniformMatrix4fv( shader.program.worldMatrix      , false ,       world.data );
        this.gl.uniformMatrix4fv( shader.program.viewMatrix       , false ,        view.data );
        this.gl.uniformMatrix4fv( shader.program.projectionMatrix , false ,     project.data );
        
        
        this.gl.drawElements( this.gl.TRIANGLES, batch.iBuffer.data.numItems, this.gl.UNSIGNED_SHORT, 0  );
    }


    function Batch()
    {
        // vertex sources
        // index  sources   
        // Vertex attributes
        // Batch flags
    };
    
    
