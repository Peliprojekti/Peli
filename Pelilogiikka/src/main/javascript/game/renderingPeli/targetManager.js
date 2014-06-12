var renderingPeli = renderingPeli || {};
renderingPeli.targetManager = {
    world: null,
    ducks: null,
    initialize: function (world) {
        "use strict";
        var i;

        this.world = world;
        this.ducks = world.get_Targets();

        for (i = 0; i < this.ducks.length; i++) {
            this.ducks[i].duckIsAlive = true;
            this.ducks[i].duckPosition = 0;
        }
    },
    updateTargetPositions: function (time) {
        "use strict";
        var i;

        for (i = 0; i < this.ducks.length; i++) {
            if (this.ducks[i].duckIsAlive) {
                this.ducks[i].set_Stage(
                    ((this.ducks[i].duckPosition++ % 150) / 150)
                    );

                //console.debug(this.ducks[i].duck
                //console.debug( (this.ducks[i].duckPos++ % 150) / 150 );
            }
        }
    },
    shoot: function (position) {
        "use strict";
        var hits = this.world.get_Hits(position);
        if (hits.length > 0) {
            this.killHitDucks(hits);
            return true;
        }
        return false;
    },
    killHitDucks: function (hits) {
        "use strict";
        for (i = 0; i < hits.length; i++) {
            hits[i].duckPosition = 0;
        }
    }


};

