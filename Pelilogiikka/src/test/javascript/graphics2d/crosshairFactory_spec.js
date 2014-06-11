describe('crosshairFactory', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('the factory functions', function () {
        it('getNextImgURL returns valid crosshair path', function () {
            var path = crosshairFactory.getNextImgURL();
            expect(path).toMatch(new RegExp('/data/crosshairs/.*'));
        });
        it('create CrosshairImg object without given id', function () {
            var ch = crosshairFactory.createImg();
            expect(ch instanceof crosshairFactory.CrosshairImg).toBeTruthy();
            expect(ch.getID()).not.toBe(null);
        });
    });

    describe('Crosshair object', function () {
        it('initializes correctly with a set color', function () {
            var crosshair = new crosshairFactory.Crosshair(20, "rgb(255,255,255)");
            expect(crosshair.getColor()).toBe("rgb(255,255,255)");
        });
        it('initializes correctly with a random color', function () {
            var crosshair = new crosshairFactory.createRandomColor(20);
            expect(crosshair).not.toBe(null);
        });
        it('draws the crosshair graphic', function () {
            var crosshair = new crosshairFactory.Crosshair(20, "rgb(255,255,255)");
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
    });

    describe('CrosshairImg tests', function () {
        it('initializes the crosshair correctly', function () {
            var crosshairImg = new crosshairFactory.createImg(2);
            var string = crosshairImg.img.src.split(/data/);
            expect(string[1]).toBe("/crosshairs/crosshair2.png");
            expect(crosshairImg.width).toBe(64);
            expect(crosshairImg.height).toBe(64);
            expect(crosshairImg.id).toBe(2);
        });
        it('draws the crosshair correctly', function () {
            var crosshairImg = new crosshairFactory.createImg(1);
            var mockContext = {
                drawImage: function () {
                }
            };
            mockContext.canvas = new Object();
            mockContext.canvas.width = 1;
            mockContext.canvas.height = 1;
            spyOn(mockContext, 'drawImage');
            crosshairImg.draw(mockContext, 0, 0);
            expect(mockContext.drawImage).toHaveBeenCalled();
        });
    });
});