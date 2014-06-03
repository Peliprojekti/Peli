function CrosshairManager() {
    this.numOfCrosshairs = 1;
    this.crosshairs = [];
    this.initCrosshairs(this.numOfCrosshairs);
}

CrosshairManager.prototype.initCrosshairs = function() {
    for (var i = 0; i < this.numOfCrosshairs; i++) {
        this.crosshairs.push(i);
    }
};

/**
 * Associates a crosshair id with the player given as a parameter
 * @param {type} playerName
 * @returns {undefined}
 */
CrosshairManager.prototype.requestCrosshair = function(player) {
    var id = this.crosshairs.pop();
    if (typeof id !== 'undefined'){
        return new CrosshairImg(id);
    }
    //console.debug("returning old style random crosshair")
    return new graphics2d.crosshair.createRandomColor(player.x, player.y, 20);
};

CrosshairManager.prototype.freeCrosshair = function(id) {
    this.crosshairs.push(id);
};

