



    function Scene( renderer , assetManager, path )
    {
        var fullPath               = "data/"+path+"/"+path+".irr";
        this.name                  = path;
        this.renderer              = renderer;  // Throw a wild guess what this is...
       
        if (typeof path == 'undefined')          // Create an empty scene
        {
            this.entries_Dynamic   = [];        // Animated objects differing from actors. A spinning table fan perhaps?
            this.entries_Static    = [];        // Chunks of inanimate geometry. Mostly terrain.
            this.entries_GUI       = [];        // GUI items living on projection plane.
            this.entries_Cameras   = [];        // 0..n cameras, of which only one can be active at any given time.
            this.entries_Lights    = [];        // Lights treated as ... durr? lights?
            this.entries_Actors    = [];        // Animated things that are treated as actors.
            this.entries_Particles = [];        // Active particles living in the scene.
        
        console.info("Empty scene created - No path paremeter delivered");
        }
        else
            {
                var sceneParser        = new Parser( fullPath  );
                //var dummy              = sceneParser.parse_Scene( renderer, assetManager );
                var dummy             = sceneParser.parse_Scene_Advanced( renderer, assetManager );
                
                
                
                this.entries_Dynamic   = dummy.entries_Dynamic;         // Animated objects differing from actors. A spinning table fan perhaps?
                this.entries_Static    = dummy.entries_Static;          // Chunks of inanimate geometry. Mostly terrain.
                this.entries_GUI       = dummy.entries_GUI;             // GUI items living on projection plane.
                this.entries_Cameras   = dummy.entries_Cameras;         // 0..n cameras, of which only one can be active at any given time.
                this.entries_Lights    = dummy.entries_Lights;          // Lights treated as ... durr? lights?
                this.entries_Actors    = dummy.entries_Actors;          // Animated things that are treated as actors.
                this.entries_Particles = dummy.entries_Particles;       // Active particles living in the scene.
           
            }
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
            
        rnd.begin();   
        
        
            var lights = this.entries_Lights;
           
            this.entries_Dynamic.forEach(function( entry )
            {
                rnd.draw( entry , lights );   
            });
           

        
            this.entries_GUI.forEach(function( entry )
            {
                entry.draw( rnd.gl );
            });
  
       
           // Disable momentarily
           
        rnd.end();     // All drawing is to be done here.
    }


