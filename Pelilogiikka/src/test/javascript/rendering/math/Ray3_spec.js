describe('the Ray3 object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Ray3 tests', function () {
        it('initializes the object correctly', function () {
            var ray = new Ray3(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
            expect(ray.origin.x).toBe(new Vector3(0, 0, 0).x);
            expect(ray.origin.y).toBe(new Vector3(0, 0, 0).y);
            expect(ray.origin.z).toBe(new Vector3(0, 0, 0).z);
            expect(ray.direction.x).toBe(new Vector3(1, 1, 1).normalized().x);
            expect(ray.direction.y).toBe(new Vector3(1, 1, 1).normalized().y);
            expect(ray.direction.z).toBe(new Vector3(1, 1, 1).normalized().z);
        });
        it('recognizes that rays intersect', function () {
            var ray = new Ray2(new Vector2(0, 0, 0), new Vector2(1, 1, 0));
            expect(ray.intersects(new Vector2(1, 0, 0), new Vector2(0, 1, 0))).toBe(true);
        });
        it('recognizes that rays do not intersect', function () {
            var ray = new Ray2(new Vector2(0, 0, 0), new Vector2(0, 0, 0));
            expect(ray.intersects(new Vector2(1, 1, 1), new Vector2(1, 1, 1))).toBe(false);
        });
    });
    describe('Plane3 tests', function () {
        it('initializes the object correctly', function () {
            var plane = new Plane3(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
            expect(plane.point.x).toBe(new Vector3(0, 0, 0).x);
            expect(plane.point.y).toBe(new Vector3(0, 0, 0).y);
            expect(plane.point.z).toBe(new Vector3(0, 0, 0).z);
            expect(plane.normal.x).toBe(new Vector3(1, 1, 1).x);
            expect(plane.normal.y).toBe(new Vector3(1, 1, 1).y);
            expect(plane.normal.z).toBe(new Vector3(1, 1, 1).z);
        });
        it('rotates the plane', function () {
            var plane = new Plane3(new Vector3(0, 0, 0), new Vector3(1, 1, 1));
            var testMatrix = new Matrix33([0, 0, 0, 1, 1, 1, 2, 2, 2]);
            plane.rotate(testMatrix);
            expect(plane.normal.x).toBe(0);
            expect(plane.normal.y).toBe(3);
            expect(plane.normal.z).toBe(6);
        });
    });

});