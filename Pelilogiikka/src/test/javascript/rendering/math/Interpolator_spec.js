describe('the interpolator object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('interpolator tests', function() {
        it('interpolates', function() {
            var testInterpolator = new Interpolator(0.5, 1.5);
            expect(testInterpolator.interpolate(2)).toBe(2.5);
        });
    });

});