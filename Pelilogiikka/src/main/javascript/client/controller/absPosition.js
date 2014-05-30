var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['absPosition'] = function(container, canvas, phone, coms) {
    var previousTime = Date.now();
    var interval = 20;

    var mouseMoveListener = function(event) {
        //phone.setControllerInfo(event.clientX + " x " + event.clientY);
        coms.call('position', [
                event.clientX / canvas.width,
                event.clientY / canvas.height
            ],
            null, null);
    };

    var clickListener = function(event) {
        coms.call('shoot', [], null, null);
    };

    var touchListener = function(event) {
        event.preventDefault();

        var x = event.changedTouches[0].clientX / canvas.width;
        var y = event.changedTouches[0].clientY / canvas.height;

        var currentTime = Date.now();

        if (currentTime - previousSendTime >= interval) {
            previousSendTime = currentTime;
            coms.call('position', [x, y], null, null);
        }
    };

    canvas.addEventListener("touchmove", touchListener);
    $('#canvas').mousemove(mouseMoveListener);
    $('#canvas').click(clickListener);

    return function() {
        canvas.unbind('mousemove', mouseMoveListener);
        canvas.unbind('click', clickListener);
        canvas.removeEventListener("touchmove", touchListener);
        mouseMoveListener = null;
        clickListener = null;
    };
};