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
    players: [],
    start: function (canvas) {
        console.log("starting up renderer stuff");
        this.renderer = new Renderer(new Dimension2(canvas.width, canvas.height));
        this.camera = new Camera(new Vector3(0, 5, 150));

        this.animate(Date.now());
    },
    animate: function (time) {
        this.rendererDraw();
        requestAnimationFrame(this.animate.bind(this));
    },
    rendererDraw: function (time) {
        var i;

        this.renderer.set_Camera(this.camera);
        this.renderer.begin();
         
        this.renderer.set_Matrices( null, this.camera.get_ViewMatrix(), this.camera.get_ProjectionMatrix() );


        for (i = 0; i < this.players.length; i++) {
            //var player = this.players[i];
            var player = this.onePlayer;
            console.debug("Drawing player ", player.userID);

            this.renderer.set_Shader(player.shader);
            var trans = player.guiItem.get_Transformation();
            this.renderer.set_Matrices(trans, null, null);
            this.renderer.draw_Batch(player.guiItem.batch);
        }

        /*
         this.renderer.set_Shader( spriteShader );
         this.renderer.set_Matrices( testActor.get_Transformation(), null, null );
         this.renderer.draw_Batch(testActor);
         */

        /*
         this.renderer.set_Shader(guiShader);
         this.renderer.set_Matrices(guiItem.get_Transformation(), null, null);
         this.renderer.draw_Batch(guiItem.batch);
         */
    },
    addPlayer: function (player) {
        var texture = new Texture('/data/crosshair1.bmp');

        player.shader = new GuiShader();
        player.guiItem = new GuiItem(new Vector2(0, 0), new Dimension2(0.07, 0.07), texture);
        this.players.push(player);
        this.onePlayer = player;
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