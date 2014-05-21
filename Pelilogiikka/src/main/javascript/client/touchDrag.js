function TouchDrag() {
    this.previousSendTime = 0;
    this.interval = 20;
    this.coords = null;
    this.currentTime = null;
    this.moveCounter = 0;
    this.coms = null;
}

TouchDrag.prototype.doTouchMove = function(event) {
    event.preventDefault();
    
    this.moveCounter++;

    this.coords = getRelativeCoords(0);    

    this.currentTime = new Date().getTime();

    if (this.currentTime - this.previousSendTime >= this.interval) {
        coms.position(this.coords[0], this.coords[1]);

        this.previousSendTime = this.currentTime;

        if (DEBUG) { 
            log.info("touchmove events: " + this.moveCounter + ", interval: " + this.interval + "ms", true); 
            this.moveCounter = 0;
        }
    }

    if (DEBUG) { updateCoordinatesText(this.coords[0], this.coords[1]) };	
}

TouchDrag.prototype.enable = function(coms, canvas) {
    var thisObject = this;
    log.coms = coms;
    canvas.addEventListener("touchmove", function(event){ thisObject.doTouchMove(event); }, false);
    return canvas;
}

TouchDrag.prototype.disable = function(canvas) {
    canvas.removeEventListener("touchmove", this.doTouchMove);
}
