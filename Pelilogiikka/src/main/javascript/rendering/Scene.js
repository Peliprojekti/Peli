

function Scene( renderer )
{
    this.renderer          = renderer;
    this.entries_Dynamic   = [];
    this.entries_Static    = [];
    this.entries_GUI       = [];
    this.entries_Cameras   = [];
};


Scene.prototype.insert = function( entity, type ) 
{
    if( type === "DYNAMIC") this.entries_Dynamic.push( entity );
    else
        if( type === "STATIC" ) this.entries_Static.push( entity );
        else
            if( type === "GUI"  ) this.entries_GUI.push( entity );  
             else
                 if( type == "CAM") this.entries_Cameras.push( entity );
                 else
                     alert("Undefined entity type ");  

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
            
            rnd.draw_SS( entry );  
         });
      
   //    rnd.end_Blending();
       rnd.end();     // All drawing is to be done here.
}

/**/



