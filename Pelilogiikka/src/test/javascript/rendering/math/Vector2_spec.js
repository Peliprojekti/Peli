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
                new Vector2(5,5)).subtract(
                new Vector2(2,1));

            expect(res.x).toBe(3);
            expect(res.y).toBe(4);
        });
        it('multiplies the vector with a scalar number', function() {
            var res = (
                new Vector2(1, 2)).multiply(4);
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
            expect( testVector.length().toFixed(5) ).toBe( (2).toFixed(5) );
        });
        it('normalizes the vector', function() {
            var testVector = new Vector2(1, Math.sqrt(3)).normalized();
            expect( testVector.x.toFixed(5) ).toBe( (1/2).toFixed(5) );
            expect( testVector.y.toFixed(5) ).toBe( (Math.sqrt(3)/2).toFixed(5) );
        });
        it('projects the vector', function() {
            var vec1 = new Vector2(4,4);
            var vec2 = new Vector2(2,2);
            var result = vec1.projected(vec2);
            expect(result.x).toBe(4);
            expect(result.y).toBe(4);
        });
        it('interpolates the vector', function() {
            var vec = new Vector2(1, 1);
            var target = new Vector2(2, 2);
            
            var result = vec.interpolate(target, 0);
            expect(result.x).toBe(1);
            expect(result.y).toBe(1);
            
            result = vec.interpolate(target, 0.3);
            expect(result.x).toBeGreaterThan(1);
            expect(result.x).toBeLessThan(1.5);
            expect(result.y).toBeGreaterThan(1);
            expect(result.y).toBeLessThan(1.5);
            
            result = vec.interpolate(target, 0.8);
            expect(result.x).toBeGreaterThan(1.5);
            expect(result.x).toBeLessThan(2);
            expect(result.y).toBeGreaterThan(1.5);
            expect(result.y).toBeLessThan(2);
            
            result = vec.interpolate(target, 1);
            expect(result.x).toBe(2);
            expect(result.y).toBe(2);
        });
        
        it('returns the angle of the vector', function() {
           var vec = new Vector2(5,5);
           var baseVec = new Vector2(1, 0);
           expect( vec.angleWith(baseVec).toFixed(5) ).toBe( (45).toFixed(5) );
           
           vec = new Vector2(-5,-5);
           expect( vec.angleWith(baseVec).toFixed(5) ).toBe( (135).toFixed(5) );
        });
    });

});