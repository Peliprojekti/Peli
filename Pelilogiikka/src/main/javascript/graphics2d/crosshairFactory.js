/*jslint browser: true*/
/*global console: false*/

var crosshairFactory = {
    imgID: 1,
    images: [],
    getNextImgURL: function () {
        "use strict";

        this.imgID = ((this.imgID + 1) % 7) + 1;
        return "/data/crosshairs/crosshair" + this.imgID + ".png";
    },
    createImg: function (id) {
        "use strict";

        if (id === undefined) {
            id = this.imgID = ((this.imgID + 1) % 7) + 1;
        }
        crosshairFactory.getImage(id);
        return new crosshairFactory.CrosshairImg(id);
    },
    createRandomColor: function (radius) {
        "use strict";
        var strength = 255,
            r = Math.floor(Math.random() * strength),
            g = Math.floor(Math.random() * (strength - r)),
            b = Math.floor(Math.random() * (strength - r - g)),
            array = [r, g, b],
            temporaryValue,
            randomIndex,
            i = array.length;

        while (i > 0) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * i);
            i -= 1;

            // And swap it with the current element.
            temporaryValue = array[i];
            array[i] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return new crosshairFactory.Crosshair(radius, 'rgb(' + array.join() + ')');
    },
    getImage: function (id) {
        "use strict";

        if (this.images[id] === undefined) {
            this.images[id] = new Image();
            this.images[id].src = "/data/crosshairs/crosshair" + id + ".png";
        }
        return this.images[id];
    },

    CrosshairImg: function (id) {
        "use strict";
        this.width = 64;
        this.height = 64;
        this.id = id;
        this.img = crosshairFactory.getImage(id);
    },

    Crosshair: function (radius, color) {
        "use strict";
        this.r = radius;
        this.color = color;
    }
};

crosshairFactory.CrosshairImg.prototype = {
    draw: function (ctx, x, y) {
        "use strict";
        ctx.drawImage(
            this.img,
            x - this.width / 2,
            y - this.height / 2,
            this.width,
            this.height
        );
    },
    getID: function () {
        "use strict";
        return this.id;
    }
};

crosshairFactory.Crosshair.prototype = {
    draw: function (ctx, x, y) {
        "use strict";
        ctx.save();

        var width = ctx.canvas.width,
            height = ctx.canvas.height,
            trueX = width * x,
            trueY = height * y;

        ctx.lineWidth = 4;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.arc(trueX, trueY, this.r, 0, 2 * Math.PI, false);

        ctx.stroke();

        ctx.restore();
    },
    getColor: function () {
        "use strict";
        return this.color;
    }
};