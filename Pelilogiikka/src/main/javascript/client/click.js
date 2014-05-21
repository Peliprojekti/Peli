function Click() {}

Click.prototype.initCanvas = function(){
	var canvas = document.getElementById("canvas");
        var thisObject = this;
	canvas.addEventListener("click", function(event){ thisObject.doClick(event); }, false);
	return canvas;
}

Click.prototype.doClick = function(event) {
	event.preventDefault();
	var coords = this.getRelativeClickCoords(event);

	/*
        var x = event.x;
        var y = event.y;
	var canvasDimensions = getCanvasDimensions();
	*/

	//Test code
	updateCoordinatesText(coords[0], coords[1]);
	//clientComs.send(coords);
      clientComs.send({
            position: coords
        });
}

Click.prototype.getRelativeClickCoords = function(event) {
        var x = event.x;
        var y = event.y;

	var dimensions = getCanvasDimensions();

	var relativeX = x / dimensions[0];
	var relativeY = y / dimensions[1];

	return [relativeX, relativeY];
}
