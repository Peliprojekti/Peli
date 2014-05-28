



function Renderer( screen_Width, screen_Height )
{
    // Grab canvas and set member variables associated with it
    this.canvas          = document.getElementById("Canvas"); 
    this.canvas.width    = screen_Width;
    this.canvas.height   = screen_Height;
    this.viewport_Width  = this.canvas.width;
    this.viewport_Height = this.canvas.height;
            

       
    
    // Attempt to initialize the WebGL context
    try 
    {
        this.gl                = this.canvas.getContext("webgl") || canvas.getContext("experimental-webgl");  
        this.gl.viewportWidth  = this.canvas.width;         // Redundant?
        this.gl.viewportHeight = this.canvas.height;        // Redundant?
    } 
    catch ( exception ) 
    {
        throw new Exception(  "FATAL" , "Failed to create WebGL context: " + exception.message ); // Things have gone south. ABORT.
    }
    
    // Declare the intended winding convention and the culling policy.  
    this.gl.frontFace ( this.gl.CW         );  
    this.gl.enable    ( this.gl.CULL_FACE  );
    this.gl.cullFace  ( this.gl.BACK       );
    
    // Enable Z-buffering by default
    this.gl.enable    ( this.gl.DEPTH_TEST );
    
    // Declare the desired viewport dimensions to the device
    this.gl.viewport  ( 0, 0, this.gl.viewportWidth, this.gl.viewportHeight );
    
    // Set a default blank color
    this.gl.clearColor( 0.0,1.0,1.0,1.0 );
    
    
    // FPS observation variables
    this.timer        = new Timer();
    this.frameCounter = 0;
    this.fps          = 0;
    
    console.info("Renderer initialized" );
}



Renderer.prototype.begin = function()
{
    this.gl.clear( this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT );


}


Renderer.prototype.end = function()
{
    
        if( this.timer.elapsed_Milliseconds() < 500 ) this.frameCounter++;
        else
            {
                this.fps = 2*this.frameCounter;
                this.frameCounter = 0;
                this.timer.reset();
            }
}