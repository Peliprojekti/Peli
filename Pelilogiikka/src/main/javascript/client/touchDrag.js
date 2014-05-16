var previousSendTime = 0;
var interval = 20;
var coords;
var currentTime;

function doTouchMove(event){
	event.preventDefault();
	coords = getRelativeCoords(0);
	
	currentTime = new Date().getTime();

	if (currentTime - previousSendTime >= interval) {
		 clientComs.send({
		            position: coords               
		});

		previousSendTime = currentTime;
	}
	


	
	//Test code
	//updateCoordinatesText(coords[0], coords[1]);	

}

function initCanvas(){
	var canvas = document.getElementById("canvas");
	canvas.addEventListener("touchmove", doTouchMove, false);
	return canvas;
}
