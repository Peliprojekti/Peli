describe('the Color object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Color tests', function () {
        it('initializes with valid colors', function () {
            var testColor = new Color(0.1, 0.2, 0.3, 0.4);
            expect(testColor.red).toBe(0.1);
            expect(testColor.green).toBe(0.2);
            expect(testColor.blue).toBe(0.3);
            expect(testColor.alpha).toBe(0.4);
        });
    });

});