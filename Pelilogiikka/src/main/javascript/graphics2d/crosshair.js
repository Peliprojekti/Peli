var graphics2d = graphics2d || {};

graphics2d.crosshair = {
    createRandomColor: function(x, y, radius) {
        var strength = 255;

        var r = Math.floor(Math.random() * strength);
        var g = Math.floor(Math.random() * (strength - r));
        var b = Math.floor(Math.random() * (strength - r - g));

        var color = [r, g, b];
        
        var temporaryValue, randomIndex;
        for (var i = color.length; i >= 0;) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * i);
            i -= 1;

            // And swap it with the current element.
            temporaryValue = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return new graphics2d.crosshair.Crosshair(x, y, radius,
            'rgb(' + [r, g, b].join() + ')'
        );
    },

    Crosshair: function(x, y, radius, color) {
        this.r = radius;
        this.color = color || ("#" +
            Math.floor(Math.random() * 80) +
            Math.floor(Math.random() * 80) +
            Math.floor(Math.random() * 80));
    }
};

graphics2d.crosshair.Crosshair.prototype.draw = function(ctx, x, y) {
    ctx.save();

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;

    var trueX = width * x;
    var trueY = height * y;

    ctx.lineWidth = 4;
    ctx.strokeStyle = this.color;

    ctx.beginPath();
    ctx.arc(trueX, trueY, this.r, 0, 2 * Math.PI, false);
    //log.info("Drew crosshair to: (" + trueX + ", " + trueY + ")");
    ctx.stroke();

    ctx.restore();
};

graphics2d.crosshair.Crosshair.prototype.setPosition = function(ar) {
    //log.debug("moving crosshair to position " + ar[0] + "x" + ar[1]);
    this.x = ar[0];
    this.y = ar[1];
};
