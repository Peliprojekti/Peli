
var client = client || {};

client.CrosshairDisplay = function (canvas, id) {
    "use strict";
    this.borderSize = 10;
    this.borderColor = 'green';
    this.bgColor = 'gray';
    this.padding = 5;
    this.size = 48;
    this.x = canvas.width / 2 - (this.size/2);
    this.y = 0;

    if (id !== null) {
        this.crosshairImage = new Image();
        this.crosshairImage.src = "/data/crosshairs/crosshair" + id + ".png";
    }

};

client.CrosshairDisplay.prototype = {
    draw: function (ctx) {
        "use strict";

        ctx.fillStyle = this.borderColor;
        ctx.fillRect(
            this.x - this.borderSize - this.padding, 
            0 - this.borderSize - this.padding, 
            (this.size + 2 * (this.borderSize + this.padding)), 
            (this.size + 2 * (this.borderSize + this.padding))
        );

        ctx.fillStyle = this.bgColor;
        ctx.fillRect(
            this.x - this.padding, 
            0 - this.padding, 
            this.size + 2 * this.padding, 
            this.size + 2 * this.padding
        );
              
              /*
        this.width + 4, this.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(10, 10, this.width - 20, this.height - 20);
        */

        if (this.crosshairImage) {
            //ctx.drawImage(this.crosshairImage, this.x), this.y, this.scale, this.scale);
            ctx.drawImage(this.crosshairImage, this.x, this.y, this.size, this.size);
        }
    }
};