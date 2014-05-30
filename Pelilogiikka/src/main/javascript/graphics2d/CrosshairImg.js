function CrosshairImg(id) {
    this.width = 128;
    this.height = 128;
    this.img = new Image();
    this.img.src = "/data/crosshairs/crosshair" + id + ".png";
    this.counter = 0;
    this.id = id;
}

CrosshairImg.prototype.draw = function(ctx, x, y){
     ctx.drawImage(this.img, x*ctx.canvas.width-this.width/2, y*ctx.canvas.height-this.height/2);
};