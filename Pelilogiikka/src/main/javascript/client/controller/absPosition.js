var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes['absPosition'] = function(container, canvas, phone, coms) {

    var mouseDisabler = controller.loadedTypes['mouseMove'](container, canvas, phone, coms);
    //var touchDisabler = controller.touchDrag(container, canvas, phone);

    return function() {
        mousdeDisabler();
        //touchDisabler();
    };
};