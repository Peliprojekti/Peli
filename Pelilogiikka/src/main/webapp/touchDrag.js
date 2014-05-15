function doTouchMove(event){
	event.preventDefault();
	var coords = getFingerCoords(0);
	
	updateCoordinatesText(coords[0], coords[1]);	
}

function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("touchmove", doTouchMove, false);
	return canvas;
}


