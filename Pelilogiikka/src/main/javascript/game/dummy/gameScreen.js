/*global Box2D: false*/
/*global console: false*/
/*global graphics2d: false*/
/*jslint browser: true*/

/*
 B2Vec2 = Box2D.Common.Math.b2Vec2;
 B2BodyDef = Box2D.Dynamics.b2BodyDef;
 B2Body = Box2D.Dynamics.b2Body;
 B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
 B2Fixture = Box2D.Dynamics.b2Fixture;
 B2World = Box2D.Dynamics.b2World;
 B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
 B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
 B2DebugDraw = Box2D.Dynamics.b2DebugDraw;
 B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
 */

var dummy = dummy || {};
dummy.screen = {
    physicsEnabled: false,
    width: 0,
    height: 0,
    canvas: null,
    context: null,
    box2d: dummy.box2d,
    entities: dummy.entities,
    background: [],
    players: [],
    controllers: [],
    start: function (canvas) {
        "use strict";
        this.canvas = canvas;
        this.height = canvas.height;
        this.width = canvas.width;
        this.context = canvas.getContext("2d");
        this.entities.init(canvas);
        this.box2d.init(canvas);

        this.entities.create({
            name: "companionSquare",
            type: "rectangleTarget",
            x: canvas.width - 200,
            y: 100,
            angle: 50,
            width: 100,
            height: 100
        });

        window.requestAnimationFrame(this.animate);
    },
    addController: function (controller) {
        "use strict";
        this.controllers.push(controller);
    },
    setPhysicsEnabled: function(enabled) {
        "use strict";
        this.physicsEnabled = enabled;
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
    animate: function (time) {
        "use strict";
        var self = dummy.screen;
        self.clear();
        self.drawBackground(time);

        self.updateControllers(time);

        if (self.physicsEnabled) {
            self.box2d.update(time);
        }

        self.entities.drawAll();

        self.drawPlayers(self.context);

        window.requestAnimationFrame(self.animate);
    },
    clear: function () {
        "use strict";
        this.context.fillStyle = 'white';
        this.context.fillRect(0, 0, this.width, this.height);
    },
    drawBackground: function (time) {
        "use strict";
        for (var i = 0; i < this.background.length; i++) {
            this.background[i].update(time);
            this.background[i].draw(this.context);
        }
    },
    addToBackground: function (object) {
        this.background.push(object);
    },
    updateControllers: function (time) {
        "use strict";
        this.controllers.forEach(function (c) {
            c.update(time);
        });
    },
    drawPlayers: function () {
        "use strict";
        var context = this.context;
        this.players.forEach(function (p) {
            "use strict";
            p.draw(context);
        });
    },
    shoot: function(x,y) {
        this.background.push(graphics2d.bulletHole.create(this.canvas, x, y));
    }
};
