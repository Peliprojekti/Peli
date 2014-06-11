describe('the CrosshairDisplay object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('CrosshairDisplay tests', function () {
        it('creates the object correctly', function () {
            var mockCanvas = new Object();
            mockCanvas.width = 100;
            var display = new client.CrosshairDisplay(mockCanvas, 1);
            expect(display.borderSize).toBe(10);
            expect(display.borderColor).toBe('green');
            expect(display.bgColor).toBe('gray');
            expect(display.padding).toBe(5);
            expect(display.size).toBe(48);
            expect(display.x).toBe(26);
            expect(display.y).toBe(0);
        });
        it('draws', function () {
            var mockCanvas = new Object();
            mockCanvas.width = 100;
            var mockContext = {
                drawImage: function (a, b, c, d, e) {
                },
                fillRect: function (a, b, c, d, e) {
                }
            };
            mockContext.fillStyle = 'white';
            spyOn(mockContext, 'drawImage');
            var display = new client.CrosshairDisplay(mockCanvas, 1);
            display.draw(mockContext);
            expect(mockContext.drawImage).toHaveBeenCalled();
        });
        it('resizes', function () {
            var mockCanvas = new Object();
            mockCanvas.width = 100;
            var display = new client.CrosshairDisplay(mockCanvas, 1);
            display.onResize(100, 50);
        });
    });
});
