describe('the PeliRPC object', function() {

//Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });
    //Clean it up after each spec
    afterEach(function() {
    });
    //Specs
    describe('PeliRPC tests', function() {
        it('gets onMessage', function() {
            var testPRPC = new PeliRPC(new Object());
            expect(testPRPC.getOnMessage()).not.toBeNull();
        });
        it('calls RPC', function() {
            var testPRPC = new PeliRPC(new Object());
            expect(true).toBeTruthy
        });
        it('exposes RPC method', function() {
            var testPRPC = new PeliRPC(new Object());
            expect(true).toBeTruthy
        });
    });
});