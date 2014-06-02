describe('the Orientation object', function() {
    var testOrientation;
    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
        testOrientation = new Orientation([1, 1, 1], [1, 1, 1], [1, 1, 1]);
    });

    //Clean it up after each spec
    afterEach(function() {
    });

    //Specs
        it('sets and gets position', function() {
            testOrientation.set_Position([2,2,2]);
            expect(testOrientation.get_Position()).toEqual(new Vector3(2,2,2));
        });
        it('sets rotation', function() {
            testOrientation.set_Rotation([2,2,2]);
            // maybe shouldn't test agains object internals
            expect(testOrientation.angles_V).toEqual(new Vector3(2,2,2));
        });
        it('sets scale', function() {
            testOrientation.set_Scale([2,2,2]);
            // maybe shouldn't test agains object internals
            expect(testOrientation.scales_V).toEqual(new Vector3(2,2,2));
        });
        it('displaces', function() {
            testOrientation.displace([2, 2, 2]);
            expect(testOrientation.get_Position()).toEqual(new Vector3(3, 3, 3));
        });
        it('pitches', function() {
            testOrientation.pitch(2);
            expect(testOrientation.angles_V.x).toBe(3);
        });
        it('yaws', function() {
            testOrientation.yaw(2);
            expect(testOrientation.angles_V.y).toBe(3);
        });
        it('sets rolls', function() {
            testOrientation.roll(2);
            expect(testOrientation.angles_V.z).toBe(3);
        });
        it('sets scales', function() {
            testOrientation.scale([2, 2, 2]);
            expect(testOrientation.scales_V).toEqual(new Vector3(2, 2, 2));
        });
        it('gets a matrix', function() {
            testOrientation = new Orientation([3, 2, 6], [4, 1, 7], [2, 8, 10]);
            var matrix = testOrientation.get_Matrix();
            
            expect(matrix[0].toFixed(5)).toBe('0.48834');  
            expect(matrix[1].toFixed(5)).toBe('0.31662');  
            expect(matrix[2].toFixed(5)).toBe('-3.95743');  
            expect(matrix[3].toFixed(5)).toBe('0.00000');
            expect(matrix[4].toFixed(5)).toBe('-0.98124');  
            expect(matrix[5].toFixed(5)).toBe('-0.14024');  
            expect(matrix[6].toFixed(5)).toBe('-0.13230');  
            expect(matrix[7].toFixed(5)).toBe('0.00000');
            expect(matrix[8].toFixed(5)).toBe('-1.04451');  
            expect(matrix[9].toFixed(5)).toBe('6.90864');  
            expect(matrix[10].toFixed(5)).toBe('0.42385'); 
            expect(matrix[11].toFixed(5)).toBe('0.00000');
            expect(matrix[12].toFixed(5)).toBe('3.00000'); 
            expect(matrix[13].toFixed(5)).toBe('2.00000'); 
            expect(matrix[14].toFixed(5)).toBe('6.00000'); 
            expect(matrix[15].toFixed(5)).toBe('1.00000');
        });
//        it('gets an inverted matrix', function() {
//
//        });
//        it('gets a vector', function() {
//
//        });

});