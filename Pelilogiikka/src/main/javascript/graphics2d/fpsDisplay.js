var graphics2d = graphics2d || {};

graphics2d.fpsDisplay = {
    create: function(canvas) {
        return new graphics2d.fpsDisplay.FpsDisplay(canvas, 100, 60, false);
    },

    createFancy: function(canvas) {
        return new graphics2d.fpsDisplay.FpsDisplay(canvas, canvas.width - 5, 45, true);
    },

    FpsDisplay: function(canvas, x, y, fancy) {
        this.x = x;
        this.y = y;

        this.ctx = canvas.getContext("2d");
        this.fancy = fancy;
        this.frameCount = 0;
        this.lastTime = Date.now();
        this.updateInterval = 100;
        this.fps = 0;

        if (this.fancy) {
            this.thingy = graphics2d.chartThingy.create(canvas, 
                    0,
                    0,
                    canvas.width,
                    canvas.height/8) ;
            this.thingy.color = '#309030';
        }

    }
};

graphics2d.fpsDisplay.FpsDisplay.prototype.update = function(time) {
    this.frameCount++;
    var timeDif = Date.now() - this.lastTime;

    if (timeDif > this.updateInterval) {
        this.fps = Math.round((this.frameCount / timeDif) * 1000);
        this.frameCount = 0;
        this.lastTime += timeDif;

        if (this.fancy) {
            this.thingy.addValue(this.fps);
        }
    }
};

graphics2d.fpsDisplay.FpsDisplay.prototype.draw = function() {
    "use strict";
    this.ctx.save();

    if (this.fancy) {
        this.thingy.draw(this.ctx);

        this.ctx.shadowColor = '#00FF00';
        this.ctx.shadowOffsetX = 0;
        this.ctx.shadowOffsetY = 0;
        this.ctx.shadowBlur = 10;
    }

    this.ctx.font = 'bold 40pt Calibri';
    this.ctx.fillStyle = '#30BB30';
    this.ctx.strokeStyle = '#209020';

    this.ctx.textAlign = 'right';
    this.ctx.fillText(this.fps, this.x, this.y);
    this.ctx.strokeText(this.fps, this.x, this.y);

    this.ctx.restore();
};
