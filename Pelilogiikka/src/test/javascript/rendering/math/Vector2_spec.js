describe('the Vector2 object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('Vector2 tests', function() {
        it('sets the vector', function() {
            var testVector = new Vector2(1, 1);
            testVector.set(3, 4);
            expect(testVector.x).toBe(3);
            expect(testVector.y).toBe(4);
        });

        it('adds another vector with the vector', function() {
            var res = (
                new Vector2(1,10)).add(
                new Vector2(2,20));

            expect(res.x).toBe(3);
            expect(res.y).toBe(30);
        });
        it('subtracts another vector from the vector', function() {
            var res = (
                new Vector2(5,5)).sub(
                new Vector2(2,1));

            expect(res.x).toBe(3);
            expect(res.y).toBe(4);
        });
        it('multiplies the vector with a scalar number', function() {
            var res = (
                new Vector2(1, 2)).mul(4);
            expect(res.x).toBe(4);
            expect(res.y).toBe(8);
        });
        it('multiplies the vector with another vector', function() {
            var res = (
                new Vector2(2,0)).dot(
                new Vector2(0,2));
            expect(res).toBe(0);
        });
        it('returns the length of the vector', function() {
            // allow for rounding errors, because, javascript
            var testVector = new Vector2(1, Math.sqrt(3));
            expect(Math.round(testVector.length())).toBe(2);
        });
//        it('normalizes the vector', function() {
//
//        });
//        it('projects the vector', function() {
//
//        });
    });

});