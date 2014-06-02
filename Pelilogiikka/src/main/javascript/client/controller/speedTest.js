/*jslint browser: true*/
/*global coms: true*/
/*global controller: true*/
var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.speedTest = function (container, canvas, phone, coms) {
    "use strict";
    var sequence = 0,
        stop = false,
        y = Math.random(),
        returnTime = null,
        autoFire = function () {
            if (!stop) {
                /* calls are made in sequence, so only last returnTime is needed */

                coms.call('position', [
                    ((sequence % 200) / 200),
                    y,
                    returnTime
                ],
                    null,
                    function () {
                        returnTime = Date.now();
                        autoFire();
                    });
                sequence += 1;
            }
        };

    autoFire();

    return function () {
        stop = true;
        autoFire = null;
        canvas = null;
    };
};