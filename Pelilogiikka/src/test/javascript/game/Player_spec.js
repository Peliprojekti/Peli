describe('the Player object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {});

    //Clean it up after each spec
    afterEach(function() {});

    describe('Player tests', function() {
        it ('initializes the player correctly, gets id', function() {
            var testPlayer = new Player(1234);
            expect(testPlayer.getID()).toBe(1234);
        });
        it('gets a player from the listing', function() {
            var testPlayer = new Player(1);
            expect(testPlayer.getID()).toBe(1);
        });
    });
});


//    Testit kommenteissa, koska luokan Player lataaminen rikkoo testiympäristön.

//Specs
//    describe('Player tests', function() {
//        it('initializes the player correctly, gets id', function() {
//            var testPlayer = new Player(1234);
//            expect(testPlayer.getID()).toBe(1234);
//            expect(testPlayer.x).toBe(0);
//            expect(testPlayer.y).toBe(0);
//            expect(testPlayer.gameOn).toBe(false);
//            expect(testPlayer.currentDirection).toEqual(new Vector2(0, 0));
//        });
//        it('gets a player from the listing', function() {
//            var testPlayer = playerFactory.getPlayer(1);
//            expect(testPlayer.getID()).toBe(1);
//        });
//        it('sets a listener function', function() {
//            var testPlayer = new Player(1);
//            var func = function() {
//                return 5;
//            };
//            testPlayer.setOnChangeListener(func);
//            var test = function() {
//                return null;
//            };
//            test = testPlayer.onChangeListener;
//            expect(test()).toBe(5);
//        });
////        it('sets position', function() {
////            var testPlayer = new Player(1);
////            testPlayer.setPosition([0.4, 0.6]);
////            expect(testPlayer.x).toBe(0.4);
////            expect(testPlayer.y).toBe(0.6);
////        });
//        it('sets game status', function() {
//            var testPlayer = new Player(1);
//            testPlayer.setGameOn(true);
//            expect(testPlayer.gameOn).toBe(true);
//        });
//        it('updates coordinates', function() {
//            var testPlayer = new Player(1);
//            var timestamp = new Date().getTime();
//            testPlayer.update(timestamp);
//            expect(testPlayer.x).toBe(0);
//        });
//        it('calculates changed position', function() {
//            var testPlayer = new Player(1);
//            var timestamp = new Date().getTime();
//            testPlayer.calcNewPosition(timestamp);
//            expect(testPlayer.x).toBe(0);
//        });
//        it('calculates changed direction', function() {
//            var testPlayer = new Player(1);
//            testPlayer.setPosition([0.1, 0.1]);
//            testPlayer.calcNewDirection([0.1, 0.1], [0.1, 0.5]);
//            testPlayer.calcNewDirection([0.1, 0.5], [0.2, 1]);
//            expect(testPlayer.currentDirection.x).toBe(0.1);
//            expect(testPlayer.currentDirection.y).toBe(0.9);
//        });
//    });
//});
