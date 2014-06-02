describe('the Vector4 object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
    describe('Vector4 tests', function() {
        it('constructs the vector', function() {
            var testVector = new Vector4(1, 2, 3, 4);
            
            expect(testVector.x).toBe(1);
            expect(testVector.y).toBe(2);
            expect(testVector.z).toBe(3);
            expect(testVector.w).toBe(4);
        });
        it('transforms vector4 to vector3', function() {
            var testVector = new Vector4(4, 6, 8, 2);
            var result = testVector.toVec3(testVector);
            
            expect(result.x).toBe(2);
            expect(result.y).toBe(3);
            expect(result.z).toBe(4);
        });
    });

});