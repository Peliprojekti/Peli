

    
    
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



    Renderer.prototype.draw_Batch = function( batch ) 
    {
        
    }


    function Batch()
    {
        // vertex sources
        // index  sources   
        // Vertex attributes
        // Batch flags
    };
    
    
