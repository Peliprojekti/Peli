var controller = controller || {};

controller.click = function(container, canvas, phone) {
    var listener = function(event) {
        var x = event.x / canvas.width;
        var y = event.y / canvas.width;

        client.coms.call('position', [x, y], null, null);

        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas: (" + canvas.width + ", " + canvas.height + ")"
        );
    };

    canvas.addEventListener("click", listener);

    return function() {
        canvas.removeEventListener("click", listener);
    };
};

$(document).ready(function() {
    client.phone.registerController('click', controller.click);
});
