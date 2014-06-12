describe('the Sphere3 object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Sphere3 tests', function () {
        it('initializes the object correctly', function () {
            var ray = new Sphere3(new Vector3(0, 1, 2), 3);
            expect(ray.origin.x).toBe(0);
            expect(ray.origin.y).toBe(1);
            expect(ray.origin.z).toBe(2);
            expect(ray.radius).toBe(3);
        });
    });
});