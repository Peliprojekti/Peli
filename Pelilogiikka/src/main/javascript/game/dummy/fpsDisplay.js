var dummy = dummy || {};

dummy.fpsDisplay = {
    createFancy: function(ctx) {
        return new dummy.fpsDisplay.FpsDisplay(ctx);
    },

    FpsDisplay: function(ctx) {
        this.fancy = true;
        this.width = ctx.width;
        this.frameCount = 0;
        this.lastTime = Date.now();
        this.updateInterval = 10;
        this.fps = 0;
        this.position = 0;

        this.g_fps = [];
        //this.gHeight = 120;
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
            this.g_fps.unshift(this.fps * 2);
        }
    }
};

dummy.fpsDisplay.FpsDisplay.prototype.draw = function(ctx) {
    ctx.save();
    ctx.strokeStyle = '#90AA90';

    if (this.fancy) {
        ctx.beginPath();
        var previous = 0;
        for (var i = 0; i < this.g_fps.length; i++) {
            previous = 100;
            ctx.moveTo(i, 0);
            ctx.lineTo(i, this.g_fps[i]);
        }
        ctx.closePath();
        ctx.stroke();
    }

    ctx.font = 'bold 40pt Calibri';
    ctx.fillStyle = '#30BB30';
    ctx.strokeStyle = '#209020';

    ctx.shadowColor = '#00FF00';
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 10;

    ctx.textAlign = 'left';
    ctx.fillText(this.fps, 5, 45);
    ctx.strokeText(this.fps, 5, 45);

    ctx.restore();
};
