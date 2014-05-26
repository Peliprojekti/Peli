var dummy = dummy || {};

dummy.chartThingy = {
    create: function(canvas, x, y, width, height, scale, flip) {
        return new dummy.chartThingy.ChartThingy(canvas, x, y, width, height, scale, flip);
    },

    ChartThingy: function(canvas, x, y, width, height, scale, flip) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || (canvas.width - this.x);
        this.height = height || (canvas.height - this.y);
        this.scale = Math.abs(scale) || 1000;

        console.info("creating ChartThingy", this.x, this.y, this.width, this.height, this.scale);

        if (flip) {
            this.scale = this.scale * -1;
            this.y = this.y + this.height;
        }

        this.values = [];
    }
};

dummy.chartThingy.ChartThingy.prototype.addValue = function(value) {
    while (Math.abs(value * this.scale) > this.height) {
        this.scale = this.scale * 0.8;
    }
    this.values.unshift(value);

    if (this.values.length > this.width) {
        this.values.pop();
    }
};

dummy.chartThingy.ChartThingy.prototype.update = function(time) {
};

dummy.chartThingy.ChartThingy.prototype.draw = function(ctx) {
    ctx.save();

    ctx.strokeStyle = this.color;

    ctx.beginPath();
    var previous = 0;
    for (var i = 0; i < this.values.length; i++) {
        ctx.moveTo(i + this.x, this.height + this.y);
        ctx.lineTo(i + this.x, this.y + this.height - (this.scale * this.values[i]));
    }
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
};
