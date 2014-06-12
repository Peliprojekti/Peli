describe('the Matrix44 object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Matrix44 tests', function () {
        it('initializes the matrix', function () {
            var testMatrix = new Matrix44
                ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
            expect(testMatrix.data[0]).toBe(1);
            expect(testMatrix.data[1]).toBe(2);
            expect(testMatrix.data[2]).toBe(3);
            expect(testMatrix.data[3]).toBe(4);
            expect(testMatrix.data[4]).toBe(5);
            expect(testMatrix.data[5]).toBe(6);
            expect(testMatrix.data[6]).toBe(7);
            expect(testMatrix.data[7]).toBe(8);
            expect(testMatrix.data[8]).toBe(9);
            expect(testMatrix.data[9]).toBe(10);
            expect(testMatrix.data[10]).toBe(11);
            expect(testMatrix.data[11]).toBe(12);
            expect(testMatrix.data[12]).toBe(13);
            expect(testMatrix.data[13]).toBe(14);
            expect(testMatrix.data[14]).toBe(15);
            expect(testMatrix.data[15]).toBe(16);
        });
        it('calculates the identity matrix', function () {
            var testMatrix = new Matrix44
                ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
            testMatrix.Identity();
            expect(testMatrix.data[0]).toBe(1);
            expect(testMatrix.data[1]).toBe(0);
            expect(testMatrix.data[2]).toBe(0);
            expect(testMatrix.data[3]).toBe(0);
            expect(testMatrix.data[4]).toBe(0);
            expect(testMatrix.data[5]).toBe(1);
            expect(testMatrix.data[6]).toBe(0);
            expect(testMatrix.data[7]).toBe(0);
            expect(testMatrix.data[8]).toBe(0);
            expect(testMatrix.data[9]).toBe(0);
            expect(testMatrix.data[10]).toBe(1);
            expect(testMatrix.data[11]).toBe(0);
            expect(testMatrix.data[12]).toBe(0);
            expect(testMatrix.data[13]).toBe(0);
            expect(testMatrix.data[14]).toBe(0);
            expect(testMatrix.data[15]).toBe(1);
        });
        it('multiplies two matrices', function () {
            var testMatrix = new Matrix44
                ([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            var testMatrix2 = new Matrix44
                ([0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 2]);
            var result = testMatrix.multiply(testMatrix2);
            expect(result.data[0]).toBe(0);
            expect(result.data[1]).toBe(0);
            expect(result.data[2]).toBe(0);
            expect(result.data[3]).toBe(0);
            expect(result.data[4]).toBe(4);
            expect(result.data[5]).toBe(4);
            expect(result.data[6]).toBe(4);
            expect(result.data[7]).toBe(4);
            expect(result.data[8]).toBe(0);
            expect(result.data[9]).toBe(0);
            expect(result.data[10]).toBe(0);
            expect(result.data[11]).toBe(0);
            expect(result.data[12]).toBe(8);
            expect(result.data[13]).toBe(8);
            expect(result.data[14]).toBe(8);
            expect(result.data[15]).toBe(8);
        });
        it('embeds another matrix into the matrix', function () {
            var testMatrix = new Matrix44
                ([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
            var testMatrix2 = new Matrix33([2, 2, 2, 2, 2, 2, 2, 2, 2]);
            testMatrix.embed(testMatrix2);
            var result = testMatrix;
            expect(result.data[0]).toBe(2);
            expect(result.data[1]).toBe(2);
            expect(result.data[2]).toBe(2);
            expect(result.data[3]).toBe(1);
            expect(result.data[4]).toBe(2);
            expect(result.data[5]).toBe(2);
            expect(result.data[6]).toBe(2);
            expect(result.data[7]).toBe(1);
            expect(result.data[8]).toBe(2);
            expect(result.data[9]).toBe(2);
            expect(result.data[10]).toBe(2);
            expect(result.data[11]).toBe(1);
            expect(result.data[12]).toBe(1);
            expect(result.data[13]).toBe(1);
            expect(result.data[14]).toBe(1);
            expect(result.data[15]).toBe(1);
        });
        it('embeds a translation of another matrix into the matrix', function () {
            var testVector = new Vector3(1, 2, 3);
            var testMatrix = new Matrix44
                ([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
            testMatrix.embed_Translation(testVector);
            var result = testMatrix;
            expect(result.data[0]).toBe(1);
            expect(result.data[1]).toBe(1);
            expect(result.data[2]).toBe(1);
            expect(result.data[3]).toBe(1);
            expect(result.data[4]).toBe(2);
            expect(result.data[5]).toBe(2);
            expect(result.data[6]).toBe(2);
            expect(result.data[7]).toBe(2);
            expect(result.data[8]).toBe(3);
            expect(result.data[9]).toBe(3);
            expect(result.data[10]).toBe(3);
            expect(result.data[11]).toBe(3);
            expect(result.data[12]).toBe(1);
            expect(result.data[13]).toBe(2);
            expect(result.data[14]).toBe(3);
            expect(result.data[15]).toBe(4);
        });
        it('extracts the orientation of the matrix', function () {
            var testMatrix = new Matrix44
                ([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
            testMatrix.extract_Orientation();
            var result = testMatrix;
            expect(result.data[0]).toBe(1);
            expect(result.data[1]).toBe(1);
            expect(result.data[2]).toBe(1);
            expect(result.data[3]).toBe(1);
            expect(result.data[4]).toBe(2);
            expect(result.data[5]).toBe(2);
            expect(result.data[6]).toBe(2);
            expect(result.data[7]).toBe(2);
            expect(result.data[8]).toBe(3);
        });
        it('gets a translation of the matrix', function () {
            var testMatrix = new Matrix44
                ([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
            var result = testMatrix.get_Translation();
            expect(result.x).toBe(4);
            expect(result.y).toBe(4);
            expect(result.z).toBe(4);
        });
        it('transforms a vector with the matrix', function () {
            var testVector = new Vector3(1, 2, 3);
            var testMatrix = new Matrix44
                ([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4]);
            var result = testMatrix.transform(testVector);
            expect(result.x).toBe(18);
            expect(result.y).toBe(18);
            expect(result.z).toBe(18);
        });
        it('builds a transformation of the matrix', function () {
            var testMatrix = new Matrix44
                ([1, 1, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 1, 1]);
            var result = testMatrix.build_Transformation(10, 2, 5);
            expect(result.data[0]).not.toBeNull;
            expect(result.data[1]).not.toBeNull;
            expect(result.data[2]).not.toBeNull;
            expect(result.data[3]).not.toBeNull;
            expect(result.data[4]).not.toBeNull;
            expect(result.data[5]).not.toBeNull;
            expect(result.data[6]).not.toBeNull;
            expect(result.data[7]).not.toBeNull;
            expect(result.data[8]).not.toBeNull;
            expect(result.data[9]).not.toBeNull;
            expect(result.data[10]).not.toBeNull;
            expect(result.data[11]).not.toBeNull;
            expect(result.data[12]).not.toBeNull;
            expect(result.data[13]).not.toBeNull;
            expect(result.data[14]).not.toBeNull;
            expect(result.data[15]).not.toBeNull;
        });
    });

});