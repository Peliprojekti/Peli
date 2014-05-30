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
        this.ctx = canvas.getContext("2d");
        this.x = x * canvas.width;
        this.y = y * canvas.height;
    }
};

graphics2d.bulletHole.BulletHole.prototype.update = function(time) {
    // TODO make it disintegrate on time

};


graphics2d.bulletHole.BulletHole.prototype.draw = function() {
    this.ctx.drawImage(this.img, this.x - 10, this.y - 10);
};
