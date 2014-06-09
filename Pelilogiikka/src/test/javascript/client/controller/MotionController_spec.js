describe('the MotionController (client) object', function () {

    var canvas;
    var evt;
    var coms;
    var arr;
    var controllerDisabler;
    
    sendServerMessage = function(){
        
    };

    //Create an easily-removed container for our tests to play in
    beforeEach(function () {

    });

    //Clean it up after each spec
    afterEach(function () {
    });

    //Specs
//    describe('MotionController tests', function () {
//
//        it('calls coms with the correct method and position parameters on device orientation', function () {
//            canvas = document.createElement("canvas");
//            canvas.width = 100;
//            canvas.height = 100;
//            coms = {
//                call: function (method, params, object, callback) {
//                }
//            };
//
//            client.loadedTypes.motionController(null, canvas, null, coms, 20);
//
//            spyOn(coms, 'call');
//            evt = document.createEvent("Events");
//
//            //Aim: initialize it to be the event we want     
//            evt.initEvent('deviceorientation', true, true); //true for can bubble, true for cancelable
//            data = {
//                gamma: 10,
//                beta: 20,
//                alpha: 30
//            };
//            evt.eventData = data;
//
//            canvas.dispatchEvent(evt);
//            arr = [10, 20, 30];
//            expect(coms.call).toHaveBeenCalled();
//            expect(coms.call).toHaveBeenCalledWith('orientation', arr, null, null);
//
//        });
//    });
    
   
});