function Player(userID) {
    "use strict";

    this.crosshairID = 0;
    this.userID = userID;
    this.controller = null;
    this.onDisconnect = null;
    this.onShoot = null;
    this.onSetPosition = null;
    /*
    this.bullets = [];
    this.x = 0.5;
    this.y = 0.5;
    this.crossh = null;
    this.onSetPosition = null;

    this.responseTime = null;
    this.messagesPerSecond = 0;
    */
}

Player.prototype = {
    clear: function () {
        "use strict";
        this.controller = null;
    },
    setController: function (controller) {
        "use strict";
        this.controller = controller;
    },
    getController: function () {
        "use strict";
        return this.controller;
    },
    update: function (time) {
        "use strict";
        if (this.controller !== null) {
            this.controller.update(time);
        }
    },
    getID: function () {
        "use strict";
        return this.userID;
    },
    setCrosshairID: function (crosshairID) {
        this.crosshairID = crosshairID;
    },
    getPlayerData: function () {
        "use strict";
        return {
            crosshairID: this.crosshairID
        };
    },
    setOnDisconnect: function (onDisconnect) {
        "use strict";
        this.onDisconnect = onDisconnect;
    },
    disconnect: function () {
        "use strict";
        if (this.onDisconnect !== null) {
            this.onDisconnect();
        }
    },
    setOnShoot: function (onShoot) {
        "use strict";
        this.onShoot = onShoot;
    },
    shoot: function () {
        "use strict";
        if (this.onShoot !== null) {
            this.onShoot();
        }
    },
    setOnSetPosition: function (onSetPosition) {
        "use strict";
        this.onSetPosition = onSetPosition;
    },
    setPosition: function (x, y) {
        "use strict";
        if (x > 1 || x < 0 || y > 1 || y < 0) {
            throw new Error("setPosition recieved incorrect values " + x + "," + y);
        }
        if (this.onSetPosition !== null) {
            this.onSetPosition(x, y);
        }
    }
};