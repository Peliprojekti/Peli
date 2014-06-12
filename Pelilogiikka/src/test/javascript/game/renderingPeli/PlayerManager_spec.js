describe('the PlayerManager object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    describe('add player', function () {
        it('initializes the first crosshair with id 1', function () {
            canvas = document.createElement("canvas");

            var body = document.getElementsByTagName("body")[0];
           
            document.body.appendChild(canvas);
            c = document.getElementById("canvas");
            canvas.width = 100;
            canvas.height = 100;
            expect(canvas).toEqual(c);
//            new Renderer(new Dimension2(100, 100));
//            var player = new Player(1);
//            renderingPeli.playerManager.addPlayer(player);
//            expect(player.crosshairID).toBe(1);
        });
    });

});