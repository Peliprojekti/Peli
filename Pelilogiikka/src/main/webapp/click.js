function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("click", doClick, false);
	return canvas;
}

function doClick(event) {
	event.preventDefault();
	//var coords = getRelativeClickCoords(event);
        var x = event.x;
        var y = event.y;
	var canvasDimensions = getCanvasDimensions();
	
	//Test code
	updateCoordinatesText(x, y);
      clientComs.send({
            xCoordinate: x, 
            yCoordinate: y,
            width: canvasDimensions[0],
            height: canvasDimensions[1]
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