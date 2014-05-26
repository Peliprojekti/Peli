var client = client || {};

client.phone = {
    stopped: false,
    controllerDisabler: null,
    controllers: {},
    isOrienting: false,
    isResizing: false,
    rc: 0,
    oc: 0,
    canvas: null,
    container: null,

    controllerLines: [],
    drawables: [],
    updatables: [], 
    circles: [],

    onDocumentReady: function() {
        var self = client.phone;

        self.canvas = document.getElementById('canvas'); //$('#canvas');
        self.container = $('#container');

        log.info("trying to open connection");
        client.coms.open(self.onConnectionOpened);

        $(window).on("orientationchange", self.onOrientationChange);
        $(window).resize(self.onResize);

        self.updatables.push( new dummy.fpsDisplay.create(self.canvas));

        self.onResize();
        self.startAnimation();
    },

    onOrientationChange: function() {
        var self = client.phone;

        if (self.isOrienting === false) {
            self.isOrienting = true;
            setTimeout(function() {
                self._oc++;
            }, 50);
        }
        self.isOrienting = false;
    },

    onResize: function() {
        var self = client.phone;

        if (self.isResizing === false) {
            self.isResizing = true;
            setTimeout(function() {
                self.rc++;
                var ios = navigator.userAgent.match(/(iPhone)|(iPod)/); // is iPhone

                if (ios) {
                    // increase height to get rid off ios address bar
                    $("#container").height($(window).height() + 60);
                }

                $("#canvas").attr('width', $("#container").width());
                $("#canvas").attr('height', $("#container").height());

                // hides the WebKit url bar
                if (ios) {
                    setTimeout(function() {
                        window.scrollTo(0, 1);
                    }, 100);
                }

                /*
                self.drawText('Orientiation changes: ' + self.oc++, 0);
                self.drawText('Resize events: ' + self.rc++, 1);
                */
            }, 100);
            self.isResizing = false;
            self.draw();
        }
    },

    onConnectionOpened: function() {
        var self = client.phone;
        client.coms.call('joinGame', [USERID], self,
            function(rpc_id, rpc_error, retval) {
                self.loadController(retval);
            });
    },

    addDrawable: function(drawable) {
        this.drawables.push(drawable);
    },

    setControllerInfo: function(lines) {
        this.controllerLines = lines;
    },


    /*
    drawText: function(text, textID) {
        var self = client.phone;
        if (DEBUG) {

            if (typeof textID === 'undefined') {
                throw "peli.client.phone.drawText - needs a textID";
            }


            if (self.textIndexes[textID] === undefined) {
                self.textIndexes[textID] = self.textLines++;
                self.texts.push(null);
            }

            if (self.texts[self.textIndexes[textID]] != text) {
                self.texts[self.textIndexes[textID]] = text;
            }
        }
        self.draw();
    },
    */


    /**
     * @param {string} type - a generic name for the controller
     * @param {function} enabler - function that will be called to enable controller
     */
    registerController: function(type, enabler) {
        var self = client.phone;

        if (!self.controllers[type]) {
            self.controllers[type] = enabler;
        } else {
            throw new Error("Trying to register multiple controllers of type: " + type);
        }
    },

    loadController: function(type) {
        var self = client.phone;

        if (!self.controllers[type]) {
            throw new Error("trying to enable unregistered controller type: " + type);
        }

        if (typeof self.controllerDisabler === 'function') {
            self.controllerDisabler();
            self.controllerDisabler = null;
        }

        self.controllerDisabler = self.controllers[type](
            self.container,
            self.canvas,
            self);
        //self.drawText);
    },

    getFingerCoords: function(id, event) {
        var canvas_x = event.targetTouches[id].pageX;
        var canvas_y = event.targetTouches[id].pageY;
        return [canvas_x, canvas_y];
    },

    getRelativeCoords: function(id, event) {
        var coords = this.getFingerCoords(id, event);
        var canvasDimensions = this.getCanvasDimensions();
        var relativeX = coords[0] / canvasDimensions[0];
        var relativeY = coords[1] / canvasDimensions[1];
        return [relativeX, relativeY];
    },

    getCanvasDimensions: function() {
        canvas = document.getElementById("canvas");
        width = canvas.width;
        height = canvas.height;

        return [width, height];
    },

    updateCoordinatesText: function(x, y) {
        var canvasDimensions = getCanvasDimensions();

        phone.setControllerInfo(
            "Coordinates: (" + x + ", " + y + ")",
            "Canvas width: " + canvasDimensions[0] + "\nCanvas height: " + canvasDimensions[1]
        );
    },

    startAnimation: function() {
        var self = this;

        function animate(time) {
            self.update(time);
            self.draw(time);

            if (!self.stopped) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    },

    update: function(time) {
        this.updatables.forEach(function(d) {
            d.update(time);
        });
    },

    draw: function(time) {
        var self = client.phone;

        var ctx = canvas.getContext('2d');

        var width = self.canvas.width;
        var height = self.canvas.height;
        //var canvasDimensions = [width, height];

        drawBackground(ctx);
        if (DEBUG) {
            drawTexts(ctx, width / 2, height / 2);
        }

        this.drawables.forEach(function(d) {
            d.draw(ctx);
        });

        this.updatables.forEach(function(d) {
            d.draw(ctx);
        });

        function drawTexts(ctx, xpos, ypos) {
            var texts = [
                'Orientiation changes: ' + self.oc,
                'Resize events: ' + self.rc++
            ];

            for (var k = 0; k < self.controllerLines.length; k++) {
                texts.push(self.controllerLines[k]);
            }

            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';

            var offset = 0;
            texts.forEach(function(line) {
                /* tää ei nyt haluu
                ctx.fillText( line, xpos, ypos + (10 * offset++)); 
                */
            });
        }

        function drawBackground(ctx) {
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = 'black';
            ctx.fillRect(10, 10, width - 20, height - 20);
        }
    }
};

$(document).ready(client.phone.onDocumentReady);
