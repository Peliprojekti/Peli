var mouseMove = {
    //previousSendTime: 0,
    //currentTime: null,
    //interval: 20,
    x: 0,
    y: 0,

    update: function(event) {
        mouseMove.x = event.clientX;
        mouseMove.y = event.clientY;

        clientComs.position(mouseMove.x, mouseMove.y);
        if (DEBUG) { updateCoordinatesText(mouseMove.x, mouseMove.y) };	
    },

    enable: function(canvas) {
        canvas.addEventListener("mousemove", mouseMove.update, false);
        return canvas;
    },

    disable: function(canvas) {
        canvas.removeEventListener("mousemove", mouseMove.update);
    }
}
