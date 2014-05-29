var graphics2d = graphics2d || {};

graphics2d.bulletHole = {
    _img: null,

    create: function(canvas, x, y) {
        if (graphics2d.bulletHole._img === null) {
            graphics2d.bulletHole._img = document.getElementById("bulletHole");
        }

        return new graphics2d.bulletHole.BulletHole(canvas, x, y);
    },

    BulletHole: function(canvas, x, y) {
        this.img = graphics2d.bulletHole._img;
        this.x = x * canvas.width;
        this.y = y * canvas.height;
    }
};

graphics2d.bulletHole.BulletHole.prototype.update = function(time) {};


graphics2d.bulletHole.BulletHole.prototype.draw = function(ctx) {
    ctx.drawImage(this.img, this.x - 10, this.y - 10);

        /*
    boolean Graphics.drawImage(Image img,
        int dstx1, int dsty1, int dstx2, int dsty2,
        int srcx1, int srcy1, int srcx2, int srcy2,
        ImageObserver observer);*/
};
