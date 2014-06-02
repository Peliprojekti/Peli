/*jslint browser: true*/
/*global console: false*/
/*global peliRPC: true*/
/*global chartThingy: true*/

var rpsDisplay = {
    createFancy: function (canvas) {
        "use strict";
        return new rpsDisplay.RpsDisplay(canvas, true);
    },
    RpsDisplay: function (canvas, fancy) {
        "use strict";
        this.x = canvas.width - 5;
        this.y = (canvas.height / 8) + 45;

        this.fancy = fancy;
        this.lastTime = 0;
        this.updateInterval = 1000;
        this.lastRps = 0;
        this.rps = 0;

        if (this.fancy) {
            this.thingy = chartThingy.create(canvas,
                0,
                canvas.height / 8,
                canvas.width,
                canvas.height / 8);
            this.thingy.color = '#903030';
        }
    }
};

rpsDisplay.RpsDisplay.prototype.update = function (time) {
    "use strict";
    this.frameCount += 1;

    if ((time - this.lastTime) > this.updateInterval) {
        var rpsCount = peliRPC.totalMessagesProcessed - this.lastRps;
        this.lastRps += rpsCount;

        this.rps = Math.round((rpsCount / (time - this.lastTime)) * 1000);
        this.lastTime = time;

        if (this.fancy) {
            this.thingy.addValue(this.rps);
        }
    }
};

rpsDisplay.RpsDisplay.prototype.draw = function (ctx) {
    "use strict";

    if (this.fancy) {
        this.thingy.draw(ctx);
    }

    ctx.font = 'bold 40pt Calibri';
    ctx.fillStyle = '#BB3030';
    ctx.strokeStyle = '#902020';

    ctx.textAlign = 'right';
    ctx.fillText(this.rps, this.x, this.y);
    ctx.strokeText(this.rps, this.x, this.y);

};
