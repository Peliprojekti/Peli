describe('the player object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('player tests', function() {
        it('gets id', function() {
            var testPlayer = new Player(1);
            expect(testPlayer.getID()).toBe(1);
        });
        it('sets position', function() {
            var testPlayer = new Player(1);
            testPlayer.setPosition([1, 1]);
            expect(testPlayer.x).toBe(1);
        });
        it('sets a listener function', function() {
            var testPlayer = new Player(1);
            var func = new function() {
                return 5;
            };
            testPlayer.setOnChangeListener(func);
            expect(testPlayer.onChangeListener).not.toBe(null);
        });
        it('sets game status', function() {
            var testPlayer = new Player(1);
            testPlayer.setGameOn(true);
            expect(testPlayer.gameOn).toBe(true);
        });
    });

});