describe('the screenComs object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('screenComs tests', function() {

        function returnTwo() {
            return 2;
        }

        it('sets the message function', function() {
            var func = returnTwo;
            screenComs.setOnMessage(func);
            expect(screenComs.onMessage()).toBe(2);
        });

        it('sets the position function', function() {
            var func = returnTwo;
            screenComs.setOnPosition(func);
            expect(screenComs.onPosition()).toBe(2);
        });

        it('sets the new player function', function() {
            var func = returnTwo;
            screenComs.setOnNewPlayer(func);
            expect(screenComs.onNewPlayer()).toBe(2);
        });


    });


});