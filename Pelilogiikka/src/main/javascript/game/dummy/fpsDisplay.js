var dummy = dummy || {};

dummy.fpsDisplay = {
    createFancy: function(ctx) {
        return new dummy.fpsDisplay.FpsDisplay(ctx, true);
    },

    FpsDisplay: function(ctx, fancy) {
        log.info("creating FpsDisplay");
        
        this.x = ctx.canvas.width - 5;
        this.y = 45;

        this.fancy = fancy;
        //this.width = ctx.width;
        this.frameCount = 0;
        this.lastTime = Date.now();
        this.updateInterval = 100;
        this.fps = 0;

        if (this.fancy) {
            this.thingy = dummy.chartThingy.create(ctx, 
                    0,
                    0,
                    ctx.canvas.width,
                    ctx.canvas.height/8) ;
            this.thingy.color = '#309030';
        }

    }
};

dummy.fpsDisplay.FpsDisplay.prototype.update = function(time) {
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

dummy.fpsDisplay.FpsDisplay.prototype.draw = function(ctx) {
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
