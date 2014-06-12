describe('the Dimension2 object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('Dimension2 tests', function() {
        it('it initializes the dimensions correctly', function () {
            var dimension = new Dimension2(0.5,1.5);
            expect(dimension.width).toBe(0.5);
            expect(dimension.height).toBe(1.5);
        });
    });
});