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

graphics2d.fpsDisplay.FpsDisplay.prototype.draw = function(ctx) {
    //console.debug("drawing fps");
    ctx.save();

    if (this.fancy) {
        this.thingy.draw(ctx);

        ctx.shadowColor = '#00FF00';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
    }

    ctx.font = 'bold 40pt Calibri';
    ctx.fillStyle = '#30BB30';
    ctx.strokeStyle = '#209020';

    ctx.textAlign = 'right';
    ctx.fillText(this.fps, this.x, this.y);
    ctx.strokeText(this.fps, this.x, this.y);

    ctx.restore();
};
