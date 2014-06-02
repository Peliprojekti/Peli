describe('the Vector3 object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('Vector3 tests', function() {
        it('sets the vector', function() {
            var testVector = new Vector3(1, 1, 1);
            testVector.set(3, 4, 5);
            expect(testVector.x).toBe(3);
            expect(testVector.y).toBe(4);
            expect(testVector.z).toBe(5);
        });

        it('adds another vector with the vector', function() {
            var res = (
                new Vector3(1,10,5)).add(
                new Vector3(2,20,4));

            expect(res.x).toBe(3);
            expect(res.y).toBe(30);
            expect(res.z).toBe(9);
        });
        it('subtracts another vector from the vector', function() {
            var res = (
                new Vector3(5,5,10)).sub(
                new Vector3(2,1,2));

            expect(res.x).toBe(3);
            expect(res.y).toBe(4);
            expect(res.z).toBe(8);
        });
        it('multiplies the vector with a scalar number', function() {
            var res = (
                new Vector3(1, 2, 3)).mul(4);
            expect(res.x).toBe(4);
            expect(res.y).toBe(8);
            expect(res.z).toBe(12);
        });
        it('multiplies the vector with another vector', function() {
            var res = (
                new Vector3(2,0,4)).dot(
                new Vector3(0,2,1));
            expect(res).toBe(4);
        });
        it('returns the length of the vector', function() {
            var testVector = new Vector3(1, 2, 2);
            expect(testVector.length()).toBe(3);
        });
        it('normalizes the vector', function() {
            var testVector = new Vector3(1, Math.sqrt(3), Math.sqrt(5)).normalized();
            expect(testVector.x).toBe(1/3);
            expect(testVector.y).toBe(Math.sqrt(3)/3);
            expect(testVector.z).toBe(Math.sqrt(5)/3);
        });
        it('projects the vector', function() {
            var vec1 = new Vector3(4,4,4);
            var vec2 = new Vector3(2,2,2);
            var result = vec1.projected(vec2);
            expect(result.x).toBe(4);
            expect(result.y).toBe(4);
            expect(result.z).toBe(4);
        });
        it('crosses the vector with another vector', function() {
           var vec1 = new Vector3(1, 2, 3);
           var vec2 = new Vector3(4, 5, 6);
           var result = vec1.cross(vec2);
           
            expect(result.x).toBe(-3);
            expect(result.y).toBe(6);
            expect(result.z).toBe(-3);
        });
    });
});