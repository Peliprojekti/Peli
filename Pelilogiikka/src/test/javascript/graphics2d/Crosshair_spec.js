describe('the Crosshair object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('Crosshair tests', function () {
        it('initializes correctly with a set color', function () {
            var crosshair = new graphics2d.crosshair.Crosshair(0, 0, 20, "rgb(255,255,255)");
            expect(crosshair.color).toBe("rgb(255,255,255)");
        });
        it('initializes correctly with a random color', function () {
            var crosshair = new graphics2d.crosshair.createRandomColor(0, 0, 20);
            expect(crosshair.color).toContain("rgb(");
        });
        it('draws the crosshair graphic', function () {
            var crosshair = new graphics2d.crosshair.Crosshair(0, 0, 20, "rgb(255,255,255)");
            var mockContext = {
                save: function () {
                },
                beginPath: function () {
                },
                arc: function (a, b, c, d, e) {
                },
                stroke: function () {
                },
                restore: function () {
                }
            };
            mockContext.canvas = new Object();
            mockContext.canvas.width = 1;
            mockContext.canvas.height = 1;
            spyOn(mockContext, 'save');
            spyOn(mockContext, 'beginPath');
            spyOn(mockContext, 'arc');
            spyOn(mockContext, 'stroke');
            spyOn(mockContext, 'restore');
            crosshair.draw(mockContext, 1, 1);
            expect(mockContext.save).toHaveBeenCalled();
            expect(mockContext.beginPath).toHaveBeenCalled();
            expect(mockContext.arc).toHaveBeenCalled();
            expect(mockContext.stroke).toHaveBeenCalled();
            expect(mockContext.restore).toHaveBeenCalled();
        });
        it('sets the position for the graphic', function () {
            var crosshair = new graphics2d.crosshair.Crosshair(0, 0, 20, "rgb(255,255,255)");
            var test = [2, 3];
            crosshair.setPosition(test);
            expect(crosshair.x).toBe(2);
            expect(crosshair.y).toBe(3);
        });
    });
});