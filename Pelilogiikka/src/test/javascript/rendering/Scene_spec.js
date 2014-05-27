describe('the Scene object', function() {

    //Create an easily-removed container for our tests to play in
    beforeEach(function() {
    });

    //Clean it up after each spec
    afterEach(function() {
    });


//Testit kommenteissa, koska Scene vaatii Rendereriä, joka vaatii canvasta, joka rikkoo Jasminen.


    //Specs
//    describe('Scene tests', function() {
//        it('entities are inserted', function() {
//            var testScene = new Scene(new Renderer(document.createElement('canvas')));
//            var testEntity = new Entity(new Mesh, new Material);
//            testScene.insert(testEntity, "STATIC")
//            expect(testScene.entriesStatic).not.toBe([]);
//        });
//        it('undefined entity is not inserted', function() {
//            var testScene = new Scene(new Renderer(document.createElement('canvas')));
//            var testEntity = new Entity(new Mesh, new Material);
//            testScene.insert(testEntity, "NO")
//            expect(testScene.entriesStatic).toBe(undefined);
//        });
//    });

});