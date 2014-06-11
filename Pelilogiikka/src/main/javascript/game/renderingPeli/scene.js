/*jslint browser: true*/
/*global console: false*/
/*global $: false*/
/*global game: false*/
/*global Root_Exception_Handler: false*/
/*global global_Initializer: false*/

var renderingPeli = renderingPeli || {};
renderingPeli.scene = {
    canvas: null,
    renderer: null,
    camera: null,
    world: null,
    duckPos: 0,
    players: [],
    updatables: [],
    drawables: [],
    crosshair_id: 0,
    start: function (canvas) {
        "use strict";

        this.canvas = canvas;

        console.log("starting up renderer stuff");
        this.renderer = new Renderer(new Dimension2(canvas.width, canvas.height));
        this.camera = new Camera(new Vector3(95.65460642017462, 10, -34.54491692528497));
        this.camera.yaw(180);
        this.world = new World('Fairground');

        this.registerKeyboardListeners();

        requestAnimationFrame(this.animate.bind(this));
    },
    animate: function (time) {
        "use strict";

        this.players.forEach(function (p) {
            p.update(time);
        });

        this.rendererDraw();
        requestAnimationFrame(this.animate.bind(this));
    },
    rendererDraw: function () {
        "use strict";

        var duck = this.world.get_Targets()[0],
            player, 
            i;

        this.renderer.set_Camera(this.camera);
        this.renderer.begin();

        this.renderer.set_Matrices( null, this.camera.get_ViewMatrix(), this.camera.get_ProjectionMatrix() );

        this.world.render(this.camera);

        duck.set_Stage((this.duckPos++ % 150) / 150);
        
        for (i = 0; i < this.players.length; i++) {
            player = this.players[i];

            this.renderer.set_Shader(player.shader);
            var trans = player.guiItem.get_Transformation();
            this.renderer.set_Matrices(trans, null, null);
            this.renderer.draw_Batch(player.guiItem.batch);
        };
    },
    addPlayer: function (player) {
        "use strict";
        console.info("scene::addPlayer - attaching player to scene");

        this.crosshair_id = (this.crosshair_id + 1) % 8;
        var texture = new Texture('/data/crosshairs/crosshair' + this.crosshair_id + '.png');

        player.shader = new GuiShader();
        player.guiItem = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), texture);
        player.setCrosshairID(this.crosshair_id);
        this.players.push(player);
    },
    removePlayer: function (player) {
        "use strict";

        this.players = this.players.filter(function (p) {
            return (p === player ? false : true);
        });
        
        delete player.guiItem;
        delete player.shader;
    },
    registerKeyboardListeners: function () {
        "use strict";
        var self = this;
        
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 38: 
                    self.camera.forward(2.0);
                    break;
                case 40:
                    self.camera.backwards(2.0);
                    break;
                case 37: 
                    self.camera.yaw(-2.0);
                    break;
                case 39: 
                    self.camera.yaw(2.0);
                    break;
                case 39: 
                    self.camera.yaw(2.0);
                    break;
                case 32: 
                    console.debug("camera position", self.camera.position.x, self.camera.position.y, self.camera.position.z)
                    break;
            }
        }
    }
};
