var peli =  peli || {};
peli.client = peli.client || {};

peli.client.mouseMove = function(canvas, coms) {
    var _LISTENER_NAME = 'hiiriLiike';
    var _RESIZE_CHECK_INTERVAL = 300;

    var x = 0;
    var y = 0;

    var canvasWidth;
    var canvasHeight;

    // check for canvas resize events;
    setInterval(function() {
                canvasHeight = element.height;
                canvasWidth = element.width;
    }, _RESIZE_CHECK_INTERVAL);


    // forward all events through coms
    var listener = function(event) {
        coms.position(event.clientX / canvasWidth, event.clientY / canvasHeight);
    };

    log.info("Enabling mouseMove", true);
    canvas.addEventListener(_LISTENER_NAME, listener, false);

    // return disabler function
    return function() {
        canvas.removeEventListener(_LISTENER_NAME, listener);
        listener = null;
        canvas = null;
    };
};
