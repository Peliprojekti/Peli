var graphics2d = graphics2d || {};

graphics2d.playerPerformance = {
    playerQueue: [],
    reportQueue: [],
    chartThingies: [],

    addPlayer: function(player) {
        playerQueue.unshift(player);
    },

    removePlayer: function(player) {

    },

    playerPerformanceReport: function(player, data) {
        console.debug("recieved performance report from: ", player);
        reportQueue.push([player, data]);
    },

    create: function(ctx) {
        return this;
    },

    update: function() {
        while (this.reportQueue.length > 0) {
            var report = data;
            var playerID = data[0];
            var data = data[1];

        }
    },

    draw: function(ctx) {
        this.chartThingies.forEach(function(ct) {
            ct.draw();
        });
    }
};
