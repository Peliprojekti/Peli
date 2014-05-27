//describe('the Vector2 object', function() {
//
//    //Create an easily-removed container for our tests to play in
//    beforeEach(function() {
//    });
//
//    //Clean it up after each spec
//    afterEach(function() {
//    });
//
//    //Specs
//    describe('Vector2 tests', function() {
//        it('sets the vector', function() {
//            var testVector = new Vector2(1, 1);
//            testVector.set(3, 3);
//            expect(testVector.getX).toBe(3);
//        });
//        it('sets the vector', function() {
//            var testVector = new Vector2(1, 1);
//            testVector.set(3, 3);
//            expect(testVector.getY).toBe(3);
//        });
//
//        it('adds another vector with the vector', function() {
//            var testVector = new Vector2(1, 1);
//            var vec = Vector2(2, 2);
//            var resultVector = testVector.add(vec);
//            expect(resultVector.getX).toBe(3);
//        });
//        it('subtracts another vector from the vector', function() {
//            var testVector = new Vector2(5, 5);
//            var vec = Vector2(2, 2);
//            var resultVector = testVector.sub(vec);
//            expect(resultVector.getX).toBe(3);
//        });
//        it('multiplies the vector with a scalar number', function() {
//            var testVector = new Vector2(1, 1);
//            testVector.mul(4);
//            expect(testVector.getX).toBe(4);
//        });
//        it('multiplies the vector with another vector', function() {
//            var testVector = new Vector2(2, 0);
//            var vec = Vector2(0, 2);
//            expect(testVector.dot(vec)).toBe(4);
//        });
//        it('returns the length of the vector', function() {
//            var testVector = new Vector2(3, 3);
//            expect(testVector.length).toBe(4);
//        });
//        it('normalizes the vector', function() {
//
//        });
//        it('projects the vector', function() {
//
//        });
//    });
//
//});