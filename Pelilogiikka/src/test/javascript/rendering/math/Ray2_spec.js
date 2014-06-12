describe('the Ray2 object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Ray2 tests', function () {
        it('initializes the object correctly', function () {
            var ray = new Ray2(new Vector2(0,0), new Vector2(1,1));
            expect(ray.origin.x).toBe(new Vector2(0,0).x);
            expect(ray.origin.y).toBe(new Vector2(0,0).y);
            expect(ray.direction.x).toBe(new Vector2(1,1).normalized().x);
            expect(ray.direction.y).toBe(new Vector2(1,1).normalized().y);
        });
        it('recognizes that rays intersect', function () {
            var ray = new Ray2(new Vector2(0,0), new Vector2(1,1));
            expect(ray.intersects(new Vector2(1,0), new Vector2(0,1))).toBe(true);
        });
        it('recognizes that rays do not intersect', function () {
            var ray = new Ray2(new Vector2(0,0), new Vector2(1,1));
            expect(ray.intersects(new Vector2(1,1), new Vector2(2,2))).toBe(false);
        });
    });
});