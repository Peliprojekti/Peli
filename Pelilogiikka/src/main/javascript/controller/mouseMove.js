var controller = controller || {};

controller.mouseMove = function(container, canvas, drawText) {
    var coms = client.coms;

    // forward all events through coms
    var listener = function(event) {
        drawText(event.clientX + " x " + event.clientY, 'position');
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

$(document).ready(function() {
    client.phone.registerController('mouseMove', controller.mouseMove);
});
