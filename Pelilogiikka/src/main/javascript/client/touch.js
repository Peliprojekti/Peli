function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("touchstart", doTouch, false);
	return canvas;
}

function doTouch(event) {
	event.preventDefault();
	var coords = getRelativeCoords(0);

	//Test code
	updateCoordinatesText(coords[0], coords[1]);
	//clientComs.send(coords);
        clientComs.send({
              position: coords
        });
}

