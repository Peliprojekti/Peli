var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['mouseMove'] = function(container, canvas, phone, coms) {

    // forward all events through coms
    var listener = function(event) {
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

    $('#canvas').mousemove(listener);
    $('#canvas').click(clickListener);

    // return disabler function
    return function() {
        canvas.unbind('mousemove', listener);
        listener = null;
        canvas = null;

        //TODO
    };
};