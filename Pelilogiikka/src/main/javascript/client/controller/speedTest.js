var controller = controller || {};

controller.loadedTypes = controller.loadedTypes || [];
controller.loadedTypes.speedTest = function(container, canvas, phone, coms) {
    var self = this;
    var autoFireInterval = 1;
    var reportInterval = 1000;
    var sequence = 0;
    var startTime = Date.now();
    var lastTime = Date.now();

    //var sendTimes = [];
    var report = [];

    var y = Math.random();

    var autoFire = function() {
        //console.log("nay");
        var sendTime = Date.now();

        var id = coms.call('position', [
                ((sequence % 200) / 200), y],
                null,
                function(id) {
                    var returnTime = Date.now();
                    //console.debug("filing report", sendTime, returnTime);
                    report.push( [sendTime, returnTime]);
                });

        //self.sendTimes[id] = sendTime;
        sequence++;
    };
    var inter_autoFire = setInterval(autoFire, autoFireInterval);


    var inter_reporter = setInterval(function() {
        // this is not entirely accurate...


        var partReport = report.splice(0, report.length);

        /*
        var msgSec = self.bi.callsMade;
        var retTime = 0;
        var myReturnTimes = self.bi.returnTimes;
        self.bi.returnTimes = [];

        myReturnTimes.forEach(function(time) {
            retTime += time;
        });

        var avgResponseTime = retTime / msgSec;

        phone.setControllerInfo(
            "messages sent: " + msgSec, "msgSent",
            "repsonse time: " + avgResTime, "restime"
            );
            */

        //console.info("speedTest calling playerPerformanceReport", msgSec, avgResponseTime);

        coms.call('playerPerformanceReport', 
                [ partReport ], null, null);

    }, reportInterval);

    // return disabler function
    return function() {
        clearInterval(inter_autoFire);
        clearInterval(inter_reporter);
        autoFire = null;
        canvas = null;
    };
};