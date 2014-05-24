var controller = controller || {};

controller.speedTest = function(container, canvas, drawText) {
    var coms = client.coms;
    var autoFireInterval = 1;
    var reportInterval = 1000;

    var bi = {
        startTime: Date.now(),
        lastTime: Date.now(),
        sequence: 0,
        //callTimes: [],
        callsMade: 0,
        returnTimes: []
    };

    var y = Math.random();

    var autoFire = function() {
        this.callsMade++;
        //canvas.drawText('yay', 'autoFireYAYA');

        var sendTime = Date.now();
        bi.callsMade++;

        coms.call('position', [ ((bi.sequence % 200) / 200), y],
                this,
                function() {
                    var duration = Date.now() - sendTime;
                    bi.returnTimes.push(duration);
                });

        bi.sequence++;
    };

    log.info("starting autoFie", true);

    var inter_autoFire = setInterval(autoFire, autoFireInterval);
    var inter_reporter = setInterval(function() {
        // this is not entirely accurate...

        var msgSec = bi.callsMade;
        var retTime = 0;
        var myReturnTimes = bi.returnTimes;
        bi.returnTimes = [];
        
        myReturnTimes.forEach(function(time) {
            retTime += time;
        });

        var avgResTime = retTime/msgSec;

        drawText("messages sent: " + msgSec, "msgSent");
        drawText("repsonse time: " + avgResTime, "restime");

        bi.callsMade -= msgSec;
    }, reportInterval);

    // return disabler function
    return function() {
        clearInterval(inter_autoFire);
        clearInterval(inter_reporter);
        autoFire = null;
        canvas = null;
    };
};

$(document).ready(function() {
    client.phone.registerController('speedTest', controller.speedTest);
});
