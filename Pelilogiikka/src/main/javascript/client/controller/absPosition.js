var controller = controller || {};

controller.absPosition = function(container, canvas, phone) {
    var mouseDisabler = controller.mouseMove(container, canvas, phone);
    var touchDisabler = controller.touchDrag(container, canvas, phone);

    return function() {
        mousdeDisabler();
        touchDisabler();
    };
};

$(document).ready(function() {
    client.phone.registerController('absPosition', controller.absPosition);
});
