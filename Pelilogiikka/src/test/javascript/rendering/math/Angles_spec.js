describe('the Angles object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    describe('DegToRad test', function () {
        it('converts 10 degs correctly to radians', function () {
            expect(DegToRad(10).toFixed(2)).toBe('0.17');
        });
    });

    describe('RadToDeg test', function () {
        it('converts 10 radians correctly to degrees', function () {
            expect(RadToDeg(10).toFixed(2)).toBe('572.96');
        });
    });

});