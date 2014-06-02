/*jslint browser: true*/
/*global coms: true*/
/*global controller: true*/
var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.speedTest = function (container, canvas, phone, coms) {
    "use strict";
    var autoFireInterval = 1,
        sequence = 0,
        report = [],
        y = Math.random(),
        inter_autoFire = null,
        autoFire = function () {
            var sendTime = Date.now();

            coms.call('position', [
                ((sequence % 200) / 200),
                y,
                report.pop()
            ],
                null,
                function () {
                    report.push([sendTime, Date.now()]);
                });

            sequence += 1;
        };

    inter_autoFire = setInterval(autoFire, autoFireInterval);

    return function () {
        clearInterval(inter_autoFire);
        autoFire = null;
        canvas = null;
    };
};