var controller = controller || {};

controller.absPosition = function(container, canvas, drawText) {
    var mouseDisabler = controller.mouseMove(container, canvas, drawText);
    var touchDisabler = controller.touchDrag(container, canvas, drawText);

    return function() {
        mousdeDisabler();
        touchDisabler();
    };
};

$(document).ready(function() {
    client.phone.registerController('absPosition', controller.absPosition);
});
