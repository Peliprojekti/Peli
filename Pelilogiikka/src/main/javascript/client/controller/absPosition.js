/*jslint browser: true*/
/*global console: false*/
/*global $: false*/
/*global client: false*/
var clinet = client || {};

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
    $('#canvas').mousemove(mouseMoveListener);
    $('#canvas').click(clickListener);

    return function () {
        canvas.unbind('mousemove', mouseMoveListener);
        canvas.unbind('click', clickListener);
        canvas.removeEventListener("touchmove", touchListener);
        mouseMoveListener = null;
        clickListener = null;
    };
};