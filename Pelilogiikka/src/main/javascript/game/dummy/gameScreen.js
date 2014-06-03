/*global Box2D: false*/
/*global console: false*/
/*global graphics2d: false*/
/*jslint browser: true*/

var dummy = dummy || {};
dummy.screen = {
    previousTime: 0,
    targetFrameTime: 1000 / 120,
    physicsEnabled: false,
    statsEnabled: false,
    entitiesEnabled: false,
    width: 0,
    height: 0,
    context: null,
    box2d: dummy.box2d,
    entities: dummy.entities,
    background: [],
    players: [],
    controllers: [],
    start: function (canvas) {
        "use strict";
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");
        this.entities.init(canvas);
        this.box2d.init(canvas);
        this.statsDisplay = dummy.statsDisplay.create(canvas);

        this.entities.create({
            name: "companionSquare",
            type: "rectangleTarget",
            x: canvas.width - 200,
            y: 100,
            angle: 50,
            width: 100,
            height: 100
        });

        this.previousTime = Date.now();
        this.animate(0);
        //window.requestAnimationFrame(this.animate);
    },
    setPhysicsEnabled: function(enabled) {
        "use strict";
        this.physicsEnabled = enabled;
    },
    setEntitiesEnabled: function(enabled) {
        "use stridct";
        this.entitiesEnabled = enabled;
    },
    setStatsEnabled: function(enabled) {
        "use strict";
        this.statsEnabled = enabled;
    },
    addController: function (controller) {
        "use strict";
        this.controllers.push(controller);
    },
    removeController: function (controller) {
        "use strict";
        this.controllers = this.controllers.filter(function (c) {
            return (c === controller ? false : true);
        });
    },
    addPlayer: function (player) {
        "use strict";
        this.players.push(player);
    },
    removePlayer: function (player) {
        "use strict";
        this.players = this.players.filter(function (p) {
            return (p === player ? false : true);
        });
    },
    animate: function () {
        "use strict";
        var self = dummy.screen,
            ctx = self.context,
            time = Date.now();

        self.clear(ctx);

        if (self.statsEnabled) {
            self.statsDisplay.update(time);
            self.statsDisplay.draw(ctx);
        }

        if (self.physicsEnabled) {
            self.box2d.update(time);
        }

        if (self.entitiesEnabled) {
            self.entities.drawAll(ctx);
        }

        self.updateControllers(time);
        self.drawPlayers(ctx);

        setTimeout(self.animate, self.targetFrameTime + self.targetFrameTime - (time - self.previousTime));
        self.previousTime = time;
        //window.requestAnimationFrame(self.animate);
    },
    clear: function (ctx) {
        "use strict";
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);
    },
    updateControllers: function (time) {
        "use strict";
        this.controllers.forEach(function (c) {
            if (c) c.update(time);
        });
    },
    drawPlayers: function (ctx) {
        "use strict";
        this.players.forEach(function (p) {
            p.draw(ctx);
        });
    },
    shoot: function(x,y) {
        //this.background.push(graphics2d.bulletHole.create(this.canvas, x, y));
    }
};
