var mouseMove = {
    //previousSendTime: 0,
    //currentTime: null,
    //interval: 20,
    x: 0,
    y: 0,
	coms: null,

    update: function(event) {
        mouseMove.x = event.clientX;
        mouseMove.y = event.clientY;

        coms.position(mouseMove.x, mouseMove.y);
        if (DEBUG) { updateCoordinatesText(mouseMove.x, mouseMove.y) };	
    },

    enable: function(coms,canvas) {
		mouseMove.coms = coms;
        canvas.addEventListener("mousemove", mouseMove.update, false);
    },

    disable: function(canvas) {
        canvas.removeEventListener("mousemove", mouseMove.update);
    }
}
