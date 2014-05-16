function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("click", doClick, false);
	return canvas;
}

function doClick(event) {
	event.preventDefault();
	var coords = getRelativeClickCoords(event);

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

function getRelativeClickCoords(event) {
        var x = event.x;
        var y = event.y;

	var dimensions = getCanvasDimensions();

	var relativeX = x / dimensions[0];
	var relativeY = y / dimensions[1];

	return [relativeX, relativeY];
}
