function Crosshair(x,y,radius,color) {
    this.x = 0;
    this.y = 0;
    this.r= radius;
    this.color = color;
}

Crosshair.prototype.draw = function(ctx) {
    ctx.save();

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
    ctx.stroke();

    ctx.restore();
}

Crosshair.prototype.setPosition = function(ar) {
    log.debug("moving crosshair to position " + ar[0] + "x" + ar[1]);
    this.x = ar[0];
    this.y = ar[1];
}
    
