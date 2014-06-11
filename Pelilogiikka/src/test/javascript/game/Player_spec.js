describe('the Player object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {});

    //Clean it up after each spec
    afterEach(function() {});

    describe('constructor', function() {
        it ('initializes the player correctly with given id', function() {
            var testPlayer = new Player(1234);
            expect(testPlayer.getID()).toBe(1234);
        });
    });
    describe('listener getters/setters', function () {
        it ('work correctly and call methods on events', function () {
            var player = new Player(1234),
                val = 'nada';

            player.setOnDisconnect(function () {
                val = 'disconnect';
            });
            player.setOnShoot(function () {
                val = 'shoot';
            });
            player.setOnSetPosition(function (x, y) {
                val = x + "." + y;
            });

            expect(val).toBe('nada');
            player.shoot();
            expect(val).toBe('shoot');
            player.setPosition(0.1,0.2);
            expect(val).toBe('0.1.0.2');
            player.disconnect();
            expect(val).toBe('disconnect');
        });
        it ('setPosition still wont allow incorrect values', function () {
            var player = new Player(1253);

            player.setOnSetPosition(function (x, y) {
                val = x + "." + y;
            });

            expect(function () {
                player.setPosition(1.1, 0.1);
            }).toThrow();
        });
    });
    describe('controler related methods', function () {
        it ('kinda do their thing', function () {
            var player = new Player(1253),
                counter = 0,
                controller = {
                    update: function (time) {
                        counter += time;
                    }
                };

            player.setController(controller);
            expect(player.getController()).toBe(controller);
            player.update(2);
            expect(counter).toBe(2);
            player.update(3);
            expect(counter).toBe(5);
            player.clear();
            expect(player.getController()).toBe(null);
        });
    });
    describe('getPlayerData and related methods', function () {
        it ('correcly return valid data after setting', function () {
            var player = new Player(1253);
            player.setCrosshairID(2);

            expect(player.getPlayerData().crosshairID).toBe(2);
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
