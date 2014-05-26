var controller = controller || {};

controller.speedTest = function(container, canvas, phone) {
    var self = this;
    var coms = client.coms;
    var autoFireInterval = 1;
    var reportInterval = 1000;

    this.bi = {
        startTime: Date.now(),
        lastTime: Date.now(),
        sequence: 0,
        //callTimes: [],
        returnTimes: []
    };

    var y = Math.random();

    var autoFire = function() {
        //this.callsMade++;

        var sendTime = Date.now();

        coms.call('position', [((self.bi.sequence % 200) / 200), y],
            this,
            function() {
                var duration = Date.now() - sendTime;
                self.bi.returnTimes.push(duration);
            });

        self.bi.sequence++;
    };

    log.info("starting autoFie", true);

    var inter_autoFire = setInterval(autoFire, autoFireInterval);
    var inter_reporter = setInterval(function() {
        // this is not entirely accurate...

        var msgSec = self.bi.callsMade;
        var retTime = 0;
        var myReturnTimes = self.bi.returnTimes;
        self.bi.returnTimes = [];

        myReturnTimes.forEach(function(time) {
            retTime += time;
        });

        var avgResTime = retTime / msgSec;

        phone.setControllerInfo(
            "messages sent: " + msgSec, "msgSent",
            "repsonse time: " + avgResTime, "restime"
        );

        console.info("speedTest", msgSec, avgResTime);

        client.coms.call('playerPerformanceReport', [
            USERID, {
                msgs: msgSec,
                resTime: avgResTime,
            }
        ], null, null);

        self.bi.callsMade -= msgSec;
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
