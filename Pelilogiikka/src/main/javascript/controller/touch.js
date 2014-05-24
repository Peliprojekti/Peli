function Touch() {}

Touch.prototype.initCanvas = function(){
	var canvas = document.getElementById("canvas");
        var thisObject = this;
	canvas.addEventListener("touchstart", function(event){ thisObject.doTouch(event); }, false);
	return canvas;
}

Touch.prototype.doTouch = function(event) {
	event.preventDefault();
	var coords = getRelativeCoords(0);

	//Test code
	updateCoordinatesText(coords[0], coords[1]);
	//clientComs.send(coords);
        clientComs.send({
              position: coords
        });
}

