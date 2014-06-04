/*global console: false*/
/*global game: true*/
/*global rpsDisplay: false*/
/*global fpsDisplay: false*/
/*jslint browser: true*/

var dummy = dummy || {};
dummy.statsDisplay = {
    fpsDisplay: null,
    rpsDisplay: null,
    delta: 10,
    canvasWidth: 0,
    width: 100,
    x: 0,
    y: 0,
    create: function (canvas) {
        "use strict";
        this.fpsDisplay = fpsDisplay.createFancy(canvas);
        this.rpsDisplay = rpsDisplay.createFancy(canvas);
        this.y = Math.floor(canvas.height / 8);
        this.xStart = Math.floor(canvas.width / 8);
        this.yStart = this.y;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.width = Math.floor(canvas.width / 10);
        this.deltaX = Math.floor(canvas.width / 150);
        this.deltaY = Math.floor(canvas.height / 150);
        this.verticalLineCount = 3;

        return this;
    },
    update: function (time) {
        "use strict";
        this.fpsDisplay.update(time);
        this.rpsDisplay.update(time);

        this.connectedPlayers = game.controllerHub.playerCount;
        this.openConnections = game.controllerHub.freeConnections + this.connectedPlayers;
    },
    draw: function (ctx) {
        "use strict";
        ctx.save();
        this.fpsDisplay.draw(ctx);
        this.rpsDisplay.draw(ctx);

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 3;

        for (var i = 1; i <= 7; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.yStart * i);
            ctx.lineTo(this.x + (this.width), this.yStart * i);
            ctx.closePath();
            ctx.stroke();
        }

        for (var i = 1; i <= this.verticalLineCount; i++) {
            ctx.beginPath();
            ctx.moveTo(this.xStart, this.y + (this.yStart * i));
            ctx.lineTo(this.xStart + (this.width), this.y + (this.yStart * i));
            ctx.closePath();
            ctx.stroke();
        }

        this.x += this.deltaX;
        this.y += this.deltaY;
        if (this.x <= 0 || (this.x + this.width) >= this.canvasWidth) {
            this.deltaX *= -1;
        }

        if (this.y <= 0 || (this.y + (this.yStart*this.verticalLineCount) ) >= this.canvasHeight) {
            this.deltaY *= -1;
        }

        ctx.fillStyle = '#3030BB';
        ctx.strokeStyle = '#202090';
        ctx.lineWidth = 1;

        ctx.font = 'bold 40pt Calibri';
        ctx.textAlign = 'center';
        ctx.fillText(this.openConnections, this.canvasWidth / 2, 70);
        //ctx.strokeText(this.fps, this.x, this.y);
        ctx.font = 'normal 12pt Calibri';
        ctx.fillText('open connections', this.canvasWidth / 2, 20);
        ctx.strokeText('open connections', this.canvasWidth / 2, 20);

        ctx.font = 'bold 40pt Calibri';
        ctx.textAlign = 'center';
        ctx.fillText(this.connectedPlayers, this.canvasWidth / 2, 150);
        //ctx.strokeText(this.fps, this.x, this.y);
        ctx.font = 'normal 12pt Calibri';
        ctx.fillText('connected players', this.canvasWidth / 2, 100);
        ctx.strokeText('connected players', this.canvasWidth / 2, 100);
        ctx.restore();
    }
};
