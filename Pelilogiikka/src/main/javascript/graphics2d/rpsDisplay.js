var graphics2d = graphics2d || {};

graphics2d.rpsDisplay = {
    createFancy: function(canvas) {
        return new graphics2d.rpsDisplay.RpsDisplay(canvas, true);
    },

    RpsDisplay: function(canvas, fancy) {
        log.info("creating RpsDisplay");

        this.x = canvas.width - 5;
        this.y = (canvas.height / 8) + 45;

        this.fancy = fancy;
        this.lastTime = Date.now();
        this.updateInterval = 100;
        this.lastRps = 0;
        this.rps = 0;

        if (this.fancy) {
            this.thingy = graphics2d.chartThingy.create(canvas,
                0,
                canvas.height / 8,
                canvas.width,
                canvas.height / 8);
            this.thingy.color = '#903030';
        }
    }
};

graphics2d.rpsDisplay.RpsDisplay.prototype.update = function(time) {
    this.frameCount++;
    var timeDif = Date.now() - this.lastTime;

    if (timeDif > this.updateInterval) {
        var rpsCount = peliRPC.totalMessagesProcessed - this.lastRps;
        this.lastRps += rpsCount;

        this.rps = Math.round((rpsCount / timeDif) * 1000);
        this.lastTime += timeDif;

        if (this.fancy) {
            this.thingy.addValue(this.rps);
        }
    }
};

graphics2d.rpsDisplay.RpsDisplay.prototype.draw = function(ctx) {
    ctx.save();

    if (this.fancy) {
        this.thingy.draw(ctx);

        ctx.shadowColor = '#FF0000';
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 10;
    }

    ctx.font = 'bold 40pt Calibri';
    ctx.fillStyle = '#BB3030';
    ctx.strokeStyle = '#902020';

    ctx.textAlign = 'right';
    ctx.fillText(this.rps, this.x, this.y);
    ctx.strokeText(this.rps, this.x, this.y);

    ctx.restore();
};
