describe('the Orientation object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
        it('sets and gets position', function() {
            var testOrientation = new Orientation([1, 1, 1], [1, 1, 1], [1, 1, 1]);
            testOrientation.set_Position([2,2,2]);
            expect(testOrientation.get_Position()).toEqual(new Vector3(2,2,2));
        });
        it('sets rotation', function() {
            var testOrientation = new Orientation([1, 1, 1], [1, 1, 1], [1, 1, 1]);
            testOrientation.set_Rotation([2,2,2]);
            // maybe shouldn't test agains object internals
            expect(testOrientation.angles_V).toEqual(new Vector3(2,2,2));
        });
        it('sets scale', function() {
            var testOrientation = new Orientation([1, 1, 1], [1, 1, 1], [1, 1, 1]);
            testOrientation.set_Scale([2,2,2]);
            // maybe shouldn't test agains object internals
            expect(testOrientation.scales_V).toEqual(new Vector3(2,2,2));
        });
//        it('displaces', function() {
//
//        });
//        it('pitches', function() {
//
//        });
//        it('yaws', function() {
//
//        });
//        it('sets rolls', function() {
//
//        });
//        it('sets scales', function() {
//
//        });
//        it('gets a matrix', function() {
//
//        });
//        it('gets an inverted matrix', function() {
//
//        });
//        it('gets a vector', function() {
//
//        });

});