/*global Box2D: false*/
/*global console: false*/
/*jslint browser: true*/

var B2Vec2 = Box2D.Common.Math.b2Vec2;
var B2BodyDef = Box2D.Dynamics.b2BodyDef;
var B2Body = Box2D.Dynamics.b2Body;
var B2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var B2Fixture = Box2D.Dynamics.b2Fixture;
var B2World = Box2D.Dynamics.b2World;
var B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var B2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var B2DebugDraw = Box2D.Dynamics.b2DebugDraw;
var B2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;

var dummy = dummy || {};
dummy.screen = {
    canvas: null,
    world: null,
    background: [],
    scale: 20,
    velocityIterations: 8,
    positionIterations: 3,
    lastFrameTime: Date.now(),
    start: function (canvas) {
        "use strict";
        this.canvas = canvas;

        this.setupCanvas();
        this.setupBox2dWorld();
        this.setupDebugDraw();

        this.createRectangularBody();

        window.requestAnimationFrame(this.animate);
    },
    animate: function (time) {
        "use strict";
        var self = dummy.screen;

        self.box2dStep((time - self.lastFrameTime) / 1000);

        self.drawBackground(time);
        self.world.DrawDebugData();

        self.lastFrameTime = time;
        window.requestAnimationFrame(self.animate);
    },
    setupCanvas: function () {
        "use strict";
        var container = document.getElementById("container");
        this.canvas = document.getElementById("canvas");

        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;

        this.background.push(graphics2d.fpsDisplay.createFancy(canvas));
        //this.background.push(graphics2d.rpsDisplay.createFancy(canvas));
    },
    drawBackground: function (time) {

    },
    box2dStep: function (timeStep) {
        if (timeStep > 2 / 60) {
            timeStep = 2 / 60;
        }

        this.world.Step(timeStep, this.velocityIterations, this.positionIterations);
        this.world.ClearForces();
    },
    setupBox2dWorld: function () {
        "use strict";
        this.world = new B2World(new B2Vec2(0, 9.8), /* gravity */
                true /* Allow objects that are at rest to fall asleep and be excluded from calculations */
                );

        var wallThickness = 1 / this.scale;
        this.buildWall(0, 0 + wallThickness,
                this.canvas.width / this.scale, wallThickness);
        this.buildWall(0, this.canvas.height / this.scale - wallThickness,
                this.canvas.width / this.scale, wallThickness);
        this.buildWall(0 + wallThickness, 0,
                wallThickness, this.canvas.height / this.scale);
        this.buildWall(this.canvas.width / this.scale - wallThickness, 0,
                wallThickness, this.canvas.height / this.scale);
    },
    buildWall: function (x, y, width, height) {
        "use strict";
        var bodyDef = new B2BodyDef(),
                fixtureDef = new B2FixtureDef();
        //body = null, fixture = null;

        bodyDef.type = B2Body.b2_staticBody;
        bodyDef.position.x = x;
        bodyDef.position.y = y;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restituion = 0.2;
        fixtureDef.shape = new B2PolygonShape();
        fixtureDef.shape.SetAsBox(width, height);
        this.world.CreateBody(bodyDef).CreateFixture(fixtureDef);
    },
    setupDebugDraw: function () {
        "use strict";
        var ctx = this.canvas.getContext("2d"),
                debugDraw = new B2DebugDraw();

        // Use this canvas context for drawing the debugging screen
        debugDraw.SetSprite(ctx);
        // Set the scale
        debugDraw.SetDrawScale(this.scale);
        // Fill boxes with an alpha transparency of 0.3
        debugDraw.SetFillAlpha(0.3);
        // Draw lines with a thickness of 1
        debugDraw.SetLineThickness(1.0);
        // Display all shapes and joints
        debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);

        // Start using debug draw in our world
        this.world.SetDebugDraw(debugDraw);
    },
    createRectangularBody: function () {
        var bodyDef = new B2BodyDef,
                fixtureDef = new B2FixtureDef;
        bodyDef.type = B2Body.b2_dynamicBody;
        bodyDef.position.x = 40 / this.scale;

        bodyDef.position.y = 100 / this.scale;
        fixtureDef.density = 1.0;
        fixtureDef.friction = 0.5;
        fixtureDef.restitution = 1.0;

        fixtureDef.shape = new B2PolygonShape;
        fixtureDef.shape.SetAsBox(30 / this.scale, 50 / this.scale);

        var body = this.world.CreateBody(bodyDef);
        var fixture = body.CreateFixture(fixtureDef);

        //body.ApplyImpulse( new B2Vec2(this.canvas.height / (this.scale*2), this.canvas.height / (this.scale*2))  );
    }
};
