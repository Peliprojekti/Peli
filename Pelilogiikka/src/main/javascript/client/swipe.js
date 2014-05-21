function Swipe() {
    this.updatePeriod = 20; //time in ms
    this.sincePrevious;
    this.startTime;
    this.coms = null;
    this.previousSendTime = 0;
}

Swipe.prototype.doTouchStart = function(event){
	event.preventDefault();
	this.startTime = new Date().getTime();
        this.sincePrevious = 0;
        
        this.sendCoords();
}

Swipe.prototype.sendCoords = function(){
	event.preventDefault();
        
        var coords = getRelativeCoords(0);
        
        if (this.sincePrevious == 0) {
            this.sincePrevious = new Date().getTime() - this.startTime;
            coms.swipe(coords[0], coords[1], 0);
            log.info("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", 0");
        }
        else {
            this.sincePrevious = new Date().getTime() - this.previousSendTime;
            coms.swipe(coords[0], coords[1], this.sincePrevious);
            log.info("Sent swipe: (" + coords[0] + ", " + coords[1] + ")" + ", " + this.sincePrevious);
        }
}


Swipe.prototype.doTouchMove = function(event){
        event.preventDefault();
    
        var currentTime = new Date().getTime();
	if (currentTime - this.previousSendTime >= this.updatePeriod) {
		this.sendCoords();
		this.previousSendTime = currentTime;
	}
	
	if (DEBUG) {
            var coords = getRelativeCoords(0);
            updateCoordinatesText(coords[0], coords[1]);
        }
}

Swipe.prototype.enable = function(coms, canvas){
        var thisObject = this;
        this.coms = coms;
	canvas.addEventListener("touchstart", function(event){ thisObject.doTouchStart(event); }, false);
	canvas.addEventListener("touchmove", function(event){ thisObject.doTouchMove(event); }, false);
}