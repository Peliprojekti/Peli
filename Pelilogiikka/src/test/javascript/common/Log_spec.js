describe('the Log object', function () {

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {
    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
    describe('log tests', function () {
        it('logs error', function () {
            log.enabled = true;
            log.error("testing an error");
            expect(log.rows.pop()).toEqual("ERROR: testing an error");
        });

    });

});