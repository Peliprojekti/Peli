var renderingPeli = renderingPeli || {};
renderingPeli.targetManager = {
    world: null,
    ducks: null,

    initialize: function(world){
        "use strict";
        ducks = this.world.get_Targets(),
            i;
        for (i = 0; i < ducks.length; i++) {
            ducks[i].duckIsAlive = true;
            ducks[i].duckPosition = 0;
            ducks[i].id = i;
        }
        this.world = world;
    },
    
    updateTargetPositions: function(time){
        "use strict";
        for (i = 0; i < ducks.length; i++) {
            if(ducks[i].duckIsAlive){
                ((ducks[i].duckPos++ % 150) / 150);
                ducks[i].set_Stage(ducks[i].duckPos);
            }
        }
    },
    
    shoot: function(position){
        //check if any duck was hit and kill the hit one
        if(true){
            
            return true;
        }
        return false;
    }
   
};

