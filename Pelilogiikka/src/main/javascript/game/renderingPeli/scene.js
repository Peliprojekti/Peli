/*jslint browser: true*/
/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global Root_Exception_Handler: false*/
/*global global_Initializer: false*/

var renderingPeli = renderingPeli || {};
renderingPeli.scene = {
    renderer: null,
    camera: null,
    controllers: {},
    players: {},
    updatables: [],
    drawables: [],
    crosshair_id: 0,
    start: function (canvas) {
        "use strict";

        console.log("starting up renderer stuff");
        this.renderer = new Renderer(new Dimension2(canvas.width, canvas.height));
        this.camera = new Camera(new Vector3(0, 5, 150));

        requestAnimationFrame(this.animate.bind(this));
    },
    animate: function (time) {
        "use strict";

        var i, playerID;

        for (playerID in this.controllers) {
            //this.controllers[playerID].update(time);
        }

        for (i = 0; i < this.updatables.length; i++) {
            this.updatables[i].update(time);
        }

        this.rendererDraw();
        requestAnimationFrame(this.animate.bind(this));
    },
    rendererDraw: function () {
        "use strict";

        var playerID, player;

        this.renderer.set_Camera(this.camera);
        this.renderer.begin();
         
        this.renderer.set_Matrices( null, this.camera.get_ViewMatrix(), this.camera.get_ProjectionMatrix() );
        
        for (playerID in this.players) {
            player = this.players[playerID];

            this.renderer.set_Shader(player.shader);
            var trans = player.guiItem.get_Transformation();
            this.renderer.set_Matrices(trans, null, null);
            this.renderer.draw_Batch(player.guiItem.batch);
        }
    },
    addPlayer: function (player) {
        "use strict";
        console.info("scene::addPlayer - attaching player to scene");

        this.crosshair_id = (this.crosshair_id + 1) % 8;
        var texture = new Texture('/data/crosshairs/crosshair' + this.crosshair_id + '.png');

        player.shader = new GuiShader();
        player.guiItem = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), texture);
        player.setCrosshairID(this.crosshair_id);
        this.controllers[player.userID] = controller;
        this.players[player.userID] = player;
    },
    removePlayer: function (player) {
        console.debug("REMOVVVVVAIGIDAISDNGSA");
        delete player.guiItem;
        delete player.shader;
        this.players[player.userID] = null;
        this.controllers[player.userID] = null;
        delete this.controllers[player.userID];
        delete this.players[player.userID];
    },
    addUpdatable: function (u) {
        "use strict";

        if (typeof u.update !== undefined) {
            this.updatables.push(u);
            return true;
        }
        return false;
    }
};
/*
 
 testShader = new SimpleShader(                                    );
 testTexture = new Texture("data/Textures/concrete.jpg");
 testBatch = testCube(testTexture);
 
 spriteShader = new SpriteShader(                                    );
 spriteTex = new Texture("data/Textures/Sprites/Otus.png");
 testSprite = testRect(spriteTex, 2, 4);
 
 
 guiShader = new GuiShader(                                      );
 guiTex = new Texture("data/crosshair1.bmp");
 testGui = testRect(guiTex, 0.007, (0.007) * 1.3333);
 
 guiItem = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), guiTex);
 
 testActor = new Actor( new Vector3(0,0,0), new Dimension2( 10,10), spriteTex );
 
 rendererMain();
 */