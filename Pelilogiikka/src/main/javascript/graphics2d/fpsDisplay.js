/*jslint browser: true*/
/*global console: false*/
/*global chartThiny: true*/

var fpsDisplay = {
    create: function (canvas) {
        "use strict";
        return new fpsDisplay.FpsDisplay(canvas, 100, 60, false);
    },
    createFancy: function (canvas) {
        "use strict";
        return new fpsDisplay.FpsDisplay(canvas, canvas.width - 5, 45, true);
    },
    FpsDisplay: function (canvas, x, y, fancy) {
        "use strict";
        this.x = x;
        this.y = y;

        this.fancy = fancy;
        this.frameCount = 0;
        this.lastTime = 0;
        this.updateInterval = 500;
        this.fps = 0;

        if (this.fancy) {
            this.thingy = chartThingy.create(canvas,
                0,
                0,
                canvas.width,
                Math.floor(canvas.height / 8));
            this.thingy.color = '#309030';
        }

    }
};

fpsDisplay.FpsDisplay.prototype.update = function (time) {
    "use strict";
    this.frameCount += 1;

    if ((time - this.lastTime) > this.updateInterval) {
        this.fps = Math.round((this.frameCount / (time - this.lastTime)) * 1000);
        this.frameCount = 0;
        this.lastTime = time;

        if (this.fancy) {
            this.thingy.addValue(this.fps);
        }
    }
};

fpsDisplay.FpsDisplay.prototype.draw = function (ctx) {
    "use strict";

    if (this.fancy) {
        this.thingy.draw(ctx);
    }

    ctx.font = 'bold 40pt Calibri';
    ctx.fillStyle = '#30BB30';
    ctx.strokeStyle = '#209020';

    ctx.textAlign = 'right';
    ctx.fillText(this.fps, this.x, this.y);
    ctx.strokeText(this.fps, this.x, this.y);
    ctx.textAlign = 'right';
    ctx.font = 'bold 12pt Calibri';
    ctx.fillText('frames per second:', this.x - 120, this.y - 20);
    ctx.strokeText('frames per second:', this.x - 120, this.y - 20);
};