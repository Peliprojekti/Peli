/*jslint browser: true*/
/*global console: false*/
/*global client: false*/
var client = client || {};

client.controllerView = {
    stopped: false,
    debug: false,
    entities: [],
    crosshair: null,
    container: null,
    context: null,
    width: 0,
    height: 0,
    canvas: null,
    create: function (container, canvas) {
        "use strict";
        this.container = container;
        this.canvas = canvas;
        this.context = canvas.getContext("2d");
        this.width = canvas.width;
        this.height = canvas.height;
        return this;
    },
    start: function () {
        "use strict";
        var self = this;
        this.stopped = false;

        function animate (time) {
            self.update(time);
            self.draw(time);

            if (!self.stopped) {
                window.requestAnimationFrame(animate);
            }
        }

        window.requestAnimationFrame(animate);
    },
    stop: function () {
        "use strict";
        this.stopped = true;
    },
    onResize: function () {
        "use strict";
        this.width = this.canvas.width = this.container.offsetWidth;
        this.height = this.canvas.height = this.container.offsetHeight;

        this.entities.forEach(function (e) {
            if (e.onResize)
                e.onResize();
        });
    },
    onOrientationChange: function () {
        "use strict";
        this.entities.forEach(function (e) {
            if (e.onOrientationChange)
                e.onOrienationChange();
        });
    },
    update: function (time) {
        "use strict";
        this.entities.forEach(function (e) {
            if (e.update)
                e.update(time);
        });
    },
    draw: function () {
        "use strict";
        var ctx = this.context;
        ctx.save();

        // fill background
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, this.width, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, this.width - 20, this.height - 20);

        if (this.crosshair !== null) 
            ctx.drawImage(this.crosshair, this.width/2 - 32, this.height/2 - 32);

        this.entities.forEach(function (e) {
            if (e.draw) {
                //console.debug("draw", e)
                e.draw(ctx);
            }
            else {
                console.debug("dont draw", e);
            }
        });

        ctx.restore();
    },
    add: function (object) {
        "use strict";
        this.entities.push(object);
    },
    showCrosshair: function(id) {
        if (id !== null) {
            this.crosshair = new Image();
            this.crosshair.src = "/data/crosshairs/crosshair" + id + ".png";
        }
    }
};
