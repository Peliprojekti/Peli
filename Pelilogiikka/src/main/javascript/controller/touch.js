var controller = controller || {};

controller.touch = function(container, canvas, phone) {
    var listener = function(event) {
        var x = event.targetTouches[0].pageX / canvas.width;
        var y = event.targetTouches[0].pageY / canvas.height;

        client.coms.call('position', [x, y], null, null);

        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas: (" + canvas.width + ", " + canvas.height + ")"
        );
    };

    canvas.addEventListener("touchstart", listener);

    return function() {
        canvas.removeEventListener("touchstart", listener);
    };
};

$(document).ready(function() {
    client.phone.registerController('touch', controller.touch);
});
