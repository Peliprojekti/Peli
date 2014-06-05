describe('the CrosshairImg object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('CrosshairImg tests', function () {
        it('initializes the crosshair correctly', function () {
            var crosshairImg = new CrosshairImg(2);
            var string = crosshairImg.img.src.split(/data/);
            expect(string[1]).toBe("/crosshairs/crosshair2.png");
            expect(crosshairImg.width).toBe(64);
            expect(crosshairImg.height).toBe(64);
            expect(crosshairImg.counter).toBe(0);
            expect(crosshairImg.id).toBe(2);
        });
        it('draws the crosshair correctly', function () {
            var crosshairImg = new CrosshairImg(1);
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