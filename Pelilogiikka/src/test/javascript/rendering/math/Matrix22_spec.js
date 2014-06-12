describe('the Matrix22 object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Matrix22 tests', function () {
        it('initializes the matrix', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            expect(testMatrix.data[0]).toBe(1);
            expect(testMatrix.data[1]).toBe(2);
            expect(testMatrix.data[2]).toBe(3);
            expect(testMatrix.data[3]).toBe(4);
        });
        it('calculates the identity matrix', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            testMatrix.Identity();
            expect(testMatrix.data[0]).toBe(1);
            expect(testMatrix.data[1]).toBe(0);
            expect(testMatrix.data[2]).toBe(0);
            expect(testMatrix.data[3]).toBe(1);
        });
        it('calculates rotation', function () {
            var testMatrix = new Matrix22([0, 0, 0, 0]);
            testMatrix.Rotation(1);
            expect(testMatrix.data[0]).toBe(0.5403023058681398);
            expect(testMatrix.data[1]).toBe(-0.8414709848078965);
            expect(testMatrix.data[2]).toBe(0.8414709848078965);
            expect(testMatrix.data[3]).toBe(0.5403023058681398);
        });
        it('calculates scaling', function () {
            var testVector = new Vector2(1, 2, 3);
            var testMatrix = new Matrix22([0, 0, 0, 0]);
            testMatrix.Scale(testVector);
            expect(testMatrix.data[0]).toBe(1);
            expect(testMatrix.data[1]).toBe(0);
            expect(testMatrix.data[2]).toBe(0);
            expect(testMatrix.data[3]).toBe(2);
        });
        it('multiplies two matrices', function () {
            var testMatrix = new Matrix22([1, 1, 0, 0]);
            var testMatrix2 = new Matrix22([2, 0, 2, 0]);
            var result = testMatrix.multiply(testMatrix2);
            expect(result.data[0]).toBe(2);
            expect(result.data[1]).toBe(2);
            expect(result.data[2]).toBe(2);
            expect(result.data[3]).toBe(2);
        });
        it('multiplies the matrix with a scalar', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.scalar_Multiply(2);
            expect(result.data[0]).toBe(2);
            expect(result.data[1]).toBe(4);
            expect(result.data[2]).toBe(6);
            expect(result.data[3]).toBe(8);
        });
        it('transforms', function () {
            var testVector = new Vector2(1, 2);
            var testMatrix = new Matrix22([0, 0, 0, 0]);
            var result = testMatrix.transform(testVector);
            expect(result).not.tobeNull;
        });
        it('calculates the determinant', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.determinant();
            expect(result).not.tobeNull;
//            expect(result).tobe(-2);
        });
        it('adjoints the matrix', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.adjoint();
            expect(result.data[0]).toBe(4);
            expect(result.data[1]).toBe(-2);
            expect(result.data[2]).toBe(-3);
            expect(result.data[3]).toBe(1);
        });
        it('recognizes an invertible matrix', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.invertible();
            expect(result).toBe(true);
        });
        it('recognizes an non-invertible matrix', function () {
            var testMatrix = new Matrix22([1, 0, 0, 0]);
            var result = testMatrix.invertible();
            expect(result).toBe(false);
        });
        it('inverts the matrix', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.invert();
            expect(result.data[0]).toBe(-2);
            expect(result.data[1]).toBe(1);
            expect(result.data[2]).toBe(1.5);
            expect(result.data[3]).toBe(-0.5);
        });
        it('extracts the row I', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.extract_I();
            expect(result.x).toBe(1);
            expect(result.y).toBe(2);
        });
        it('extracts the row J', function () {
            var testMatrix = new Matrix22([1, 2, 3, 4]);
            var result = testMatrix.extract_J();
            expect(result.x).toBe(3);
            expect(result.y).toBe(4);
        });
    });
});