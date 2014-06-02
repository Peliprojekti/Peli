   function Connection( address )
    {
        this.socket = io.connect( address );

	this.socket.on('message', function(data) 
        {
           console.log("LOL" + data.position );
           
           var xCoord = data.position[0] * renderer.target_Width;
           var yCoord = data.position[1] * renderer.target_Height;
           
           var homog_Coords = Map_To_Screen( renderer, [xCoord,yCoord] );
            
           crosshairs[0].set_Position( homog_Coords );
           
        });   
    };