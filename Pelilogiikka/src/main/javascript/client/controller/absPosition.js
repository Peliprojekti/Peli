/*jslint browser: true*/
/*global console: false*/
/*global $: false*/
/*global client: false*/
var client = client || {};

client.loadedTypes = client.loadedTypes || [];
client.loadedTypes.absPosition = function (container, canvas, phone, coms, interval) {
    "use strict";
    var previousTime = Date.now(),
        interval = interval,
        mouseMoveListener = function (event) {
            //phone.setControllerInfo(event.clientX + " x " + event.clientY);
            coms.call('position', [
                event.clientX / canvas.width,
                event.clientY / canvas.height
            ],
                null, null);
        },
        clickListener = function () {
            coms.call('shoot', [], null, null);
        },
        touchListener = function (event) {
            event.preventDefault();

            var x = event.changedTouches[0].clientX / canvas.width,
                y = event.changedTouches[0].clientY / canvas.height,
                currentTime = Date.now();

            if (currentTime - previousTime >= interval) {
                previousTime = currentTime;
                coms.call('position', [x, y], null, null);
            }
        };

    canvas.addEventListener("touchmove", touchListener);
    canvas.addEventListener("mousemove", mouseMoveListener);
    canvas.addEventListener("click", clickListener);

    return function () {
        canvas.removeEventListener('mousemove', mouseMoveListener);
        canvas.removeEventListener('click', clickListener);
        canvas.removeEventListener("touchmove", touchListener);
    };
};