var startTime;
var startCoords;

function doTouchStart(event){
	startTime = new Date().getTime();
	startCoords = getFingerCoords(0);
	updateStartCoordinatesText(startCoords[0], startCoords[1]);
	updateStartTimeText(startTime);
}

function doTouchMove(event){
	var coords = getFingerCoords(0);
	updateCoordinatesText(coords[0], coords[1]);
	var currentTime = new Date().getTime();
	updateCurrentTimeText(currentTime);
}

function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("touchstart", doTouchStart, false);
	canvas.addEventListener("touchmove", doTouchMove, false);
	return canvas;
}

