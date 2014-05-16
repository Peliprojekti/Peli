var startTime;
var startCoords;
var updatePeriod = 100; //time in ms
var previousSendTime;

function doTouchStart(event){
	event.preventDefault();
	startTime = new Date().getTime();
	startCoords = getRelativeCoords(0);

	updateStartTimeText(startTime);
         /*     clientComs.send({
                    startCoordinates: startCoords, 
                    startTime: startTime                
                });*/

	previousSendTime = startTime;

	//Test code
	updateStartCoordinatesText(startCoords[0], startCoords[1]);
}

function sendCoords(){
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


function doTouchMove(event){
	var currentTime = new Date().getTime();
	if (currentTime - previousSendTime >= updatePeriod) {
		sendCoords();
		previousSendTime = currentTime;
	}
	
	//Test code
	event.preventDefault();
	var coords = getRelativeCoords(0);
	updateCoordinatesText(coords[0], coords[1]);
	updateCurrentTimeText(currentTime);
}

function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("touchstart", doTouchStart, false);
	canvas.addEventListener("touchmove", doTouchMove, false);
	return canvas;
}