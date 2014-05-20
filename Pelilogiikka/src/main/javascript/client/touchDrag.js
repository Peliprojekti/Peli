var touchDrag = {
    previousSendTime: 0,
    interval: 20,
    coords: null,
    currentTime: null,

    doTouchMove: function(event) {
        event.preventDefault();
        touchDrag.coords = getRelativeCoords(0);

        touchDrag.currentTime = new Date().getTime();

        if (currentTime - previousSendTime >= interval) {
            clientComs.send({
                position: coords               
            });

            previousSendTime = currentTime;
        }

        if (DEBUG) { updateCoordinatesText(coords[0], coords[1]) };	
    },

    enable: function(canvas) {
        canvas.addEventListener("touchmove", touchDrag.doTouchMove, false);
        return canvas;
    },

    disable: function(canvas) {
        canvas.removeEventListener("touchmove", touchDrag.doTouchMove);
    }
}
