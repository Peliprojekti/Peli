/*jslint browser: true*/

chartThingy = {
    create: function (canvas, x, y, width, height, scale, flip) {
        "use strict";
        return new chartThingy.ChartThingy(canvas, x, y, width, height, scale, flip);
    },
    ChartThingy: function (canvas, x, y, width, height, scale, flip) {
        "use strict";
        this.maxWidth = 300;
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

chartThingy.ChartThingy.prototype.addValue = function (value) {
    "use strict";
    while (Math.abs(value * this.scale) > this.height) {
        //this.scale *= 0.8;
        for (var i = 0; i < this.values.length; i++) {
            var oldValue = (this.y + this.height - this.values[i]) / this.scale;
            this.values[i] = (this.y + this.height) - (oldValue * 0.8 * this.scale);
        }
        this.scale *= 0.8;
    }

    this.values.unshift(
        (this.y + this.height) - (value * this.scale)
        );

    if (this.values.length > this.maxWidth) {
        this.values.pop();
    }
};

chartThingy.ChartThingy.prototype.update = function () {};

chartThingy.ChartThingy.prototype.draw = function (ctx) {
    "use strict";
    var i,
        max = this.values.length;

    ctx.strokeStyle = "black";
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);

    for (i = 0; i < max; i += 1) {
        ctx.lineTo(i + this.x, this.values[i]);
    }

    ctx.lineTo(i + this.x, this.y + this.height);
    ctx.stroke();
    ctx.fill();
};
