var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['absPosition'] = function(container, canvas, phone, coms) {

    var mouseDisabler = controller.loadedTypes['mouseMove'](container, canvas, phone, coms);
    var touchDisabler = controller.loadedTypes['touchDrag'](container, canvas, phone, coms);

    return function() {
        mouseDisabler();
        touchDisabler();
    };
};