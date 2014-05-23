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
        
        var dimensions = getCanvasDimensions();
        var relativeX = mouseMove.x / dimensions[0];
        var relativeY = mouseMove.y / dimensions[1];

        coms.position(relativeX, relativeY);
        if (DEBUG) { updateCoordinatesText(relativeX, relativeY) };	
    },

    enable: function(coms,canvas) {
        mouseMove.coms = coms;
        log.info("Enabling mouseMove", true); //, false);
        canvas.addEventListener("mousemove", mouseMove.update, false);
    },

    disable: function(canvas) {
        canvas.removeEventListener("mousemove", mouseMove.update);
    }
}
