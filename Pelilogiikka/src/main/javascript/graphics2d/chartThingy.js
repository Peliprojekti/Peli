/*global console: false*/
/*global graphics2d: false*/
/*jslint browser: true*/

var graphics2d = graphics2d || {};

graphics2d.chartThingy = {
    create: function (canvas, x, y, width, height, scale, flip) {
        "use strict";
        return new graphics2d.chartThingy.ChartThingy(canvas, x, y, width, height, scale, flip);
    },
    ChartThingy: function (canvas, x, y, width, height, scale, flip) {
        "use strict";
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || (canvas.width - this.x);
        this.height = height || (canvas.height - this.y);
        this.scale = Math.abs(scale) || 1000;

        if (flip) {
            this.scale = this.scale * -1;
            this.y = this.y + this.height;
        }

        this.values = [];
    }
};

graphics2d.chartThingy.ChartThingy.prototype.addValue = function (value) {
    "use strict";
    while (Math.abs(value * this.scale) > this.height) {
        this.scale = this.scale * 0.8;
    }

    this.values.unshift(value);

    if (this.values.length > this.width) {
        this.values.pop();
    }
};

graphics2d.chartThingy.ChartThingy.prototype.update = function () {};

graphics2d.chartThingy.ChartThingy.prototype.draw = function (ctx) {
    "use strict";
    var i;
    ctx.save();

    ctx.strokeStyle = "black"; //this.color;
    ctx.fillStyle = this.color;
    ctx.globalAlpha = 0.5;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);

    for (i = 0; i < this.values.length; i += 1) {
        ctx.lineTo(i + this.x, this.y + this.height - this.values[i]);
    }

    ctx.lineTo(i + this.x, this.y + this.height);
    ctx.stroke();
    ctx.fill();

    ctx.restore();
};
