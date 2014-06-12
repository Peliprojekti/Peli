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
        renderingPeli.targetManager.initialize(this.world);


        this.registerKeyboardListeners();

        requestAnimationFrame(this.animate.bind(this));
    },
    animate: function (time) {
        "use strict";

        renderingPeli.playerManager.updatePlayers(time);

        this.rendererDraw();
        requestAnimationFrame(this.animate.bind(this));
    },
    rendererDraw: function () {
        "use strict";

        var player,
            i;

        this.renderer.set_Camera(this.camera);
        this.renderer.begin();

        this.renderer.set_Matrices(null, this.camera.get_ViewMatrix(), this.camera.get_ProjectionMatrix());

        this.world.render(this.camera);

        renderingPeli.targetManager.updateTargetPositions(time);

        for (i = 0; i < renderingPeli.playerManager.players.length; i++) {
            player = renderingPeli.playerManager.players[i];

            this.renderer.set_Shader(player.shader);
            var trans = player.guiItem.get_Transformation();
            this.renderer.set_Matrices(trans, null, null);
            this.renderer.draw_Batch(player.guiItem.batch);
        }
        ;
    },
    addPlayer: function (player) {
        renderingPeli.playerManager.addPlayer(player);
    },
    removePlayer: function (player) {
        renderingPeli.playerManager.removePlayer(player);
    },
    registerKeyboardListeners: function () {
        "use strict";
        var self = this;
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
    },
    /**
     * 
     * @param {Vector2} position vector of the shot position
     * @param {Player} the player who shot
     * @returns {boolean} was it a hit or not
     */
    shoot: function (position, player) {
        if (renderingPeli.targetManager.shoot(position)) {
            renderingPeli.playerManager.addPlayerScore(player);
            return true;
        }
        return false;
    }
};
