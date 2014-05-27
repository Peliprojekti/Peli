var controller = controller || {};

controller.mouseMove = function(container, canvas, phone) {
    var coms = client.coms;

    // forward all events through coms
    var listener = function(event) {
        phone.setControllerInfo(event.clientX + " x " + event.clientY)
        coms.call('position', [
                event.clientX / canvas.width,
                event.clientY / canvas.height
            ],
            null, null);
    };

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
