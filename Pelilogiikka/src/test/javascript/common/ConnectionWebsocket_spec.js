/*global ConnectionWebsocket: true*/
/*global console: false*/
/*global describe: false */
/*global expect: false */
/*global it: false */
/*global spyOn: false */

describe('ConnectionWebsocket', function () {
    "use strict";

    var doNothing = function () {
        console.log("doing nothing");
    };

    function getSimpleCallbackObject() {
        return {
            counter: 0,
            lastSent: null,
            closes: 0,
            opens: 0,
            lastOpen: {
                error: null,
                ok: null
            },
            open: function (error, ok) {
                this.lastOpen.error = error;
                this.lastOpen.ok = ok;
                this.counter += 1;
                this.opens = this.counter;
            },
            close: function () {
                this.counter += 1;
                this.closes = this.counter;
            },
            onMessage: function (msg) {
                this.lastSent = msg;
            }
        };
    }

    describe('constructor', function () {
        it('works', function () {
            var connection;

            expect(function () {
                connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true);
            }).not.toThrow();

            expect(connection.isOpen()).toBe(false);
        });
    });

    describe('connect', function () {
        it('works', function () {
            var connection;

            connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true);

            expect(function () {
                connection.connect(doNothing, doNothing, doNothing);
            }).not.toThrow();
        });

        it('catches missing onMessage callback', function () {
            var connection;

            connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true);

            expect(function () {
                connection.connect(doNothing, doNothing, null);
            }).toThrow();
        });
    });

    describe('sendMessage function', function () {
        it('properly forwards messages along the socket', function () {
            var connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true),
                cb = getSimpleCallbackObject(),
                socket;

            expect(connection.isOpen()).toBe(false);
            connection.connect(
                function (er, ok) { cb.open(er, ok); },
                function (er, ok) { cb.close(er, ok); },
                function (msg) { cb.onMessage(msg); }
            );

            socket = connection.getSocket();

            expect(connection.sendMessage('something')).toBe(false);
            expect(socket.lastSent).toBe(null);

            socket.launchEvent('open');

            connection.sendMessage('joku viesti');
            expect(socket.lastSent).toBe('joku viesti');
        });
    });

    describe('socket event handler', function () {
        it('recognizes opened/closed connections', function () {
            var connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true),
                cb = getSimpleCallbackObject(),
                socket;

            spyOn(cb, 'close').andCallThrough();
            spyOn(cb, 'open').andCallThrough();

            expect(connection.isOpen()).toBe(false);
            connection.connect(
                function (er, ok) { cb.open(er, ok); },
                function (er, ok) { cb.close(er, ok); },
                function (msg) { cb.onMessage(msg); }
            );

            socket = connection.getSocket();
            socket.launchEvent('open');

            expect(cb.lastOpen.error).toBe(null);
            expect(cb.lastOpen.ok).toBe(true);
            expect(connection.isOpen()).toBe(true);
            expect(cb.open).toHaveBeenCalled();
            expect(cb.close).not.toHaveBeenCalled();

            socket.launchEvent('close');
            expect(cb.close).toHaveBeenCalled();
            expect(connection.isOpen()).toBe(false);
        });

        it('recognizes player disconnect notifications', function () {
              var connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true),
                cb = getSimpleCallbackObject(),
                socket;

            expect(connection.isOpen()).toBe(false);
            connection.connect(
                function (er, ok) { cb.open(er, ok); },
                function (er, ok) { cb.close(er, ok); },
                function (msg) { cb.onMessage(msg); }
            );

            socket = connection.getSocket();
            socket.launchEvent('open');

            expect(cb.closes).toBe(0);
            socket.launchEvent('message', "-1");
            expect(cb.lastSent).not.toBe("-1");
            expect(cb.closes).not.toBe(0);
        });

        it('proplerly handles connections errors', function () {
            var connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true),
                cb = getSimpleCallbackObject(),
                socket;

            connection.connect(
                function (er, ok) { cb.open(er, ok); },
                function (er, ok) { cb.close(er, ok); },
                function (msg) { cb.onMessage(msg); }
            );

            socket = connection.getSocket();
            socket.launchEvent('open');

            socket.launchEvent('error', "virhe");

            expect(cb.lastOpen.error).toBe('virhe');
            expect(cb.lastOpen.ok).toBe(null);
            expect(connection.isOpen()).toBe(false);
        });

        it('properly forwards recieved messages', function () {
            var connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true),
                cb = getSimpleCallbackObject(),
                socket;

            connection.connect(
                function (er, ok) { cb.open(er, ok); },
                function (er, ok) { cb.close(er, ok); },
                function (msg) { cb.onMessage(msg); }
            );

            socket = connection.getSocket();
            socket.launchEvent('open');

            socket.launchEvent('message', "kiva viesti");
            //expect(cb).toBe(null);
            expect(cb.lastSent).toBe("kiva viesti");
        });
    });

    describe('onConnectionClose', function () {
        it("doesn't call closeCallback more than once", function () {
            var connection = new ConnectionWebsocket("http://localhost", 8000, "protocol", true),
                cb = getSimpleCallbackObject(),
                socket,
                closes;

            connection.connect(
                function (er, ok) { cb.open(er, ok); },
                function (er, ok) { cb.close(er, ok); },
                function (msg) { cb.onMessage(msg); }
            );
            
            socket = connection.getSocket();
            closes = cb.closes;

            socket.launchEvent('open');
            expect(cb.closes).toBe(closes);

            socket.launchEvent('close');
            expect(cb.closes).not.toBe(closes);
            closes = cb.closes;
            socket.launchEvent('close');
            expect(cb.closes).toBe(closes);
        });
    });
});