var controller = controller || {};

controller.mouseMove = function(container, canvas) {
    var _LISTENER_NAME = 'hiiriLiike';
    var _RESIZE_CHECK_INTERVAL = 300;

    var x = 0;
    var y = 0;

    var canvasWidth;
    var canvasHeight;

    // check for canvas resize events;
    setInterval(function() {
        //canvasHeight = element.height;
        //canvasWidth = element.width;
    }, _RESIZE_CHECK_INTERVAL);

    var coms = client.coms;

    // forward all events through coms
    var listener = function(event) {
        canvas.drawText(event.clientX + " x " + event.clientY, 'position');
        //coms.position(event.clientX / canvas.width, event.clientY / canvas.height);
        coms.call('position', [
                event.clientX / canvas.width,
                event.clientY / canvas.height
            ],
            null, null);
    };

    log.info("Enabling mouseMove", true);
    $('#canvas').mousemove(listener);

    // return disabler function
    return function() {
        canvas.unbind('mousemove', listener);
        listener = null;
        canvas = null;
    };
};
