/*global dummy: false*/
/*global console: false*/
/*jslint browser: true*/

dummy.screen = {
    canvas: null,
    load: function (canvas) {
        "use strict";
        this.canvas = canvas;

    },
    p_setupCanvas: function () {
        "use strict";
        var container = document.getElementById("container");
        this.canvas = document.getElementById("canvas");

        this.canvas.width = container.clientWidth;
        this.canvas.height = container.clientHeight;

        console.info("Canvas dimension is ", this.width, this.height);
    }
};
