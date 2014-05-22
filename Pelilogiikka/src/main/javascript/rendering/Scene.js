



    function Scene( renderer )
    {
        this.renderer          = renderer;  // Throw a wild guess what this is...
        
        this.entries_Dynamic   = [];        // Animated objects differing from actors. A spinning table fan perhaps?
        this.entries_Static    = [];        // Chunks of inanimate geometry. Mostly terrain.
        this.entries_GUI       = [];        // GUI items living on projection plane.
        this.entries_Cameras   = [];        // 0..n cameras, of which only one can be active at any given time.
        this.entries_Lights    = [];        // Lights treated as ... durr? lights?
        this.entries_Actors    = [];        // Animated things that are treated as actors.
        this.entries_Particles = [];        // Active particles living in the scene.
    };


    Scene.prototype.insert = function( entity, type )   
    {
        if( type === "DYNAMIC") this.entries_Dynamic.push( entity );
        else
            if( type === "STATIC" ) this.entries_Static.push( entity );
            else
                if( type === "GUI"  ) this.entries_GUI.push( entity );  
                else
                    if( type === "CAM") this.entries_Cameras.push( entity );
                    else
                        if( type === "LIGHT" ) this.entries_Lights.push( entity );
                        else
                            alert("Undefined entity type: " + type);  
                 
    }


    Scene.prototype.render = function( )
    {
        var rnd = this.renderer;
            rnd.bind_Camera( this.entries_Cameras[0] );
            rnd.begin();   // All drawing is to be done here.
            
            this.entries_Dynamic.forEach(function( entry )
            {
                rnd.draw( entry );   
            });
           
            // rnd.begin_Blending();  
       
            this.entries_GUI.forEach(function( entry )
            {
                entry.prepare( this.renderer );
                  rnd.draw_SS( entry.entity );  
            });
      
        //    rnd.end_Blending();
        rnd.end();     // All drawing is to be done here.
    }

/**/



