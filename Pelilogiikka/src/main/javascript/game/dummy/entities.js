/*global Box2D: false*/
/*global console: false*/
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
dummy.entities = {
    context: null,
    scale: 10,
    definitions: {
        companionSquare: {
            density: 1,
            friction: 0.3,
            restitution: 0.99
        }
    },
    init: function (canvas) {
        "use strict";
        this.context = canvas.getContext("2d");
    },
    create: function (entity) {
        "use strict";
        var def = this.definitions[entity.name];

        if (!def) {
            console.error("trying to create unrecognized entity ", entity.name);
            return;
        }

        switch (entity.type) {
            case "rectangleTarget":
                entity.shape = "rectangle";
                //entity.sprite = loader.loadImage("images/entities/" + entity.name + ".png");
                dummy.box2d.createRectangle(entity, def);
                break;

            default:
                console.error("undefined entity type", entity.type);
        }
    },
    draw: function (entity, position, angle) {
        var box2d = dummy.box2d;

        this.context.save();
        //this.context.translate(position.x * this.scale - entity.width/2, position.y * this.scale-entity.width/2);
        this.context.translate(position.x * this.scale,  position.y * this.scale);
        this.context.rotate(angle);
        switch (entity.type) {
            case "rectangleTarget":
                //console.log("draw", position.x, position.y, en);
                this.context.strokeStyle = "#602020";
                this.context.fillStyle = "#FF3030";
                this.context.lineWidth = 4;
                this.context.beginPath();
                this.context.moveTo(0-entity.width/2,0-entity.height/2);
                this.context.lineTo(entity.width/2, 0-entity.height/2);
                this.context.lineTo(entity.width/2, entity.height/2);
                this.context.lineTo(0-entity.width/2, entity.height/2);
                this.context.lineTo(0-entity.width/2,0-entity.height/2);
                this.context.closePath();
                this.context.fill();
                this.context.stroke();
                /*
                 this.context.drawImage(entity.sprite, 0, 0, entity.sprite.width, entity.sprite.height,
                 -entity.width / 2 - 1, -entity.height / 2 - 1, entity.width + 2, entity.height + 2);
                 */
                break;
            default:
                console.error("unable to draw entity ", entity);
                break;
        }

        this.context.rotate(-angle);
        this.context.translate(-position.x * box2d.scale + game.offsetLeft, -position.y * box2d.scale);
        this.context.restore();
    },
    drawAll: function () {
        //dummy.box2d.drawDebug();

        for (var body = dummy.box2d.world.GetBodyList(); body; body = body.GetNext()) {
            var entity = body.GetUserData();

            if (entity) {
                this.draw(entity, body.GetPosition(), body.GetAngle());
            }
        }
    }
};
    