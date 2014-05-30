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
dummy.box2d = {
    canvas: null,
    world: null,
    background: [],
    scale: 10,
    velocityIterations: 8, /* recommendation 8 */
    positionIterations: 3, /* recommendation 3 */
    lastTime: 0,
    update: function (time) {
        "use strict";
        var timeStep = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (timeStep > 2 / 60) {
            timeStep = 2 / 60;
        }

        this.world.Step(timeStep, this.velocityIterations, this.positionIterations);
        this.world.ClearForces();
    },
    drawDebug: function () {
        this.world.DrawDebugData();
    },
    init: function (canvas) {
        "use strict";
        this.canvas = canvas;
        var B2World = Box2D.Dynamics.b2World,
            B2Vec2 = Box2D.Common.Math.b2Vec2,
            wallThickness = 1 / this.scale;

        this.world = new B2World(new B2Vec2(0, 9.8), /* gravity */
            true /* Allow objects that are at rest to fall asleep and be excluded from calculations */
            );

        this.buildWall(0, wallThickness,
            this.canvas.width / this.scale, wallThickness);
        this.buildWall(0, this.canvas.height / this.scale - wallThickness,
            this.canvas.width / this.scale, wallThickness);
        this.buildWall(wallThickness, 0,
            wallThickness, this.canvas.height / this.scale);
        this.buildWall(this.canvas.width / this.scale - wallThickness, 0,
            wallThickness, this.canvas.height / this.scale);

        this.setupDebugDraw();
    },
    buildWall: function (x, y, width, height) {
        "use strict";
        var B2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            B2BodyDef = Box2D.Dynamics.b2BodyDef,
            B2Body = Box2D.Dynamics.b2Body,
            B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            bodyDef = new B2BodyDef(),
            fixtureDef = new B2FixtureDef();

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
            B2DebugDraw = Box2D.Dynamics.b2DebugDraw,
            debugDraw = new B2DebugDraw();

        debugDraw.SetSprite(ctx); /* canvas context to use for debug drawing */
        debugDraw.SetDrawScale(this.scale);
        debugDraw.SetFillAlpha(0.3);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(B2DebugDraw.e_shapeBit | B2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
    },
    createRectangle: function (entity, definition) {
        "use strict";
        var B2BodyDef = Box2D.Dynamics.b2BodyDef,
            B2FixtureDef = Box2D.Dynamics.b2FixtureDef,
            B2Body = Box2D.Dynamics.b2Body,
            B2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
            bodyDef = new B2BodyDef,
            fixtureDef = new B2FixtureDef,
            body = null,
            fixture = null;

        if (entity.isStatic) {
            bodyDef.type = B2Body.b2_staticBody;
        } else {
            bodyDef.type = B2Body.b2_dynamicBody;
        }
        bodyDef.position.x = entity.x / this.scale;
        bodyDef.position.y = entity.y / this.scale;
        if (entity.angle) {
            bodyDef.angle = Math.PI * entity.angle / 180;
        }

        fixtureDef.density = definition.density;
        fixtureDef.friction = definition.friction;
        fixtureDef.restitution = definition.restitution;

        fixtureDef.shape = new B2PolygonShape;
        fixtureDef.shape.SetAsBox(entity.width / 2 / this.scale, entity.height / 2 / this.scale);

        body = this.world.CreateBody(bodyDef);
        body.SetUserData(entity);

        fixture = body.CreateFixture(fixtureDef);
        return body;
    }
};