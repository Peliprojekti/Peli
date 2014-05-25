var controller = controller || {};

controller.touch = function(container, canvas, drawText) {
    var listener = function(event) {
        var x = event.targetTouches[0].pageX / canvas.width;
        var y = event.targetTouches[0].pageY / canvas.height;

        client.coms.call('position', [x, y], null, null);

        drawText("Coordinates: (" + x + ", " + y + ")", 'coords');
        drawText("Canvas: (" + canvas.width + ", " + canvas.height + ")", 'canvas');
    };

    canvas.addEventListener("touchstart", listener);

    return  function() {
        canvas.removeEventListener("touchstart", listener);
    };
};

$(document).ready(function() {
    client.phone.registerController('touch', controller.touch);
});
