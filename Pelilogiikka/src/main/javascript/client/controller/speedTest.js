var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.speedTest = function (container, canvas, phone, coms) {
    "use strict";
    var autoFireInterval = 1;
    var sequence = 0;

    var report = [];

    var y = Math.random();

    var autoFire = function () {
        var sendTime = Date.now();

        coms.call('position', [
            ((sequence % 200) / 200), 
            y,
            report.pop()
        ],
            null,
            function (id) {
                var returnTime = Date.now();
                report.push([sendTime, returnTime]);
            });

        sequence++;
    };
    var inter_autoFire = setInterval(autoFire, autoFireInterval);

    return function () {
        clearInterval(inter_autoFire);
        autoFire = null;
        canvas = null;
    };
};