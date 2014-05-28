function CrosshairManager(numOfCrosshairs) {
    this.numOfCrosshairs = numOfCrosshairs;
    this.crosshairs = {};
    this.initCrosshairs(numOfCrosshairs);
}

CrosshairManager.prototype.initCrosshairs = function() {
    for (var i = 0; i < this.numOfCrosshairs; i++) {
        this.crosshairs[i] = null;
    }
};

/**
 * Associates a crosshair id with the player given as a parameter
 * @param {type} playerName
 * @returns {undefined}
 */
CrosshairManager.prototype.requestCrosshair = function(playerName) {
    for (var i = 0; i < this.numOfCrosshairs; i++) {
        if (this.crosshairs[i] === null) {
            this.crosshairs[i] = playerName;
            return i;
        }
    }
    return new graphics2d.crosshair.createRandomColor(player.x, player.y, 20);;
};

CrosshairManager.prototype.freeCrosshair = function(playerName) {
    for (var i = 0; i < this.numOfCrosshairs; i++) {
        if (this.crosshairs[i] === playerName) {
            this.crosshairs[i] = null;
            return i;
        }
    }
    return null;
};

//
//var c = new CrosshairManager(5);
//alert(c.requestCrosshair("matti"));
//alert(c.requestCrosshair("pekka"));
//alert(c.freeCrosshair("matti"));

