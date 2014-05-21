function Swipe() {
    this.startTime;
    this.startCoords;
    this.updatePeriod = 100; //time in ms
    this.previousSendTime;
}

Swipe.prototype.doTouchStart = function(event){
	event.preventDefault();
	this.startTime = new Date().getTime();
	this.startCoords = getRelativeCoords(0);

	updateStartTimeText(this.startTime);
         /*     clientComs.send({
                    startCoordinates: startCoords, 
                    startTime: startTime                
                });*/

	this.previousSendTime = this.startTime;

	//Test code
	updateStartCoordinatesText(this.startCoords[0], this.startCoords[1]);
}

Swipe.prototype.sendCoords = function(){
	event.preventDefault();
	var coords = getRelativeCoords(0);
	var currentTime = new Date().getTime();

         /*     clientComs.send({
            coords: coords, 
            time: currentTime                
        });*/

	//Test code
	updateSendTimeText(currentTime);
}


Swipe.prototype.doTouchMove = function(event){
	var currentTime = new Date().getTime();
	if (currentTime - this.previousSendTime >= this.updatePeriod) {
		this.sendCoords();
		this.previousSendTime = currentTime;
	}
	
	//Test code
	event.preventDefault();
	var coords = getRelativeCoords(0);
	updateCoordinatesText(coords[0], coords[1]);
	updateCurrentTimeText(currentTime);
}

Swipe.prototype.initCanvas = function(){
	var canvas = document.getElementById("canvas");
        var thisObject = this;
	canvas.addEventListener("touchstart", function(event){ thisObject.doToucStart(event); }, false);
	canvas.addEventListener("touchmove", function(event){ thisObject.doTouchMove(event); }, false);
	return canvas;
}