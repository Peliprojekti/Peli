function Crosshair(x,y,radius,color) {
    this.r= radius;
    this.color = color;
}

Crosshair.prototype.draw = function(ctx, x, y) {
    ctx.save();

    var width = ctx.canvas.width;
    var height = ctx.canvas.height;
    
    var trueX = width * x;
    var trueY = height * y;

    ctx.beginPath();
    ctx.arc(trueX, trueY, this.r, 0, 2*Math.PI, false);
    //log.info("Drew crosshair to: (" + trueX + ", " + trueY + ")");
    ctx.stroke();

    ctx.restore();
}

Crosshair.prototype.setPosition = function(ar) {
    log.debug("moving crosshair to position " + ar[0] + "x" + ar[1]);
    this.x = ar[0];
    this.y = ar[1];
}
    
