/*global ConnectionEngineIO: true*/
/*global console: false*/
/*global describe: false */
/*global expect: false */
/*global it: false */
/*global spyOn: false */

describe('the ConnectionEngineIO object', function () {
    "use strict";

    var doNothing = function () {
        console.log("doing nothing");
    };

    function getSimpleCallbackObject() {
        return {
            lastSent: null,
            lastOpen: {
                error: null,
                ok: null
            },
            open: function (error, ok) {
                this.lastOpen.error = error;
                this.lastOpen.ok = ok;
            },
            close: function () {
                console.log("doing nothing");
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
                connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true);
            }).not.toThrow();

            expect(connection.isOpen()).toBe(false);
        });
    });

    describe('connect', function () {
        it('works', function () {
            var connection;

            connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true);

            expect(function () {
                connection.connect(doNothing, doNothing, doNothing);
            }).not.toThrow();
        });

        it('catches missing onMessage callback', function () {
            var connection;

            connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true);

            expect(function () {
                connection.connect(doNothing, doNothing, null);
            }).toThrow();
        });
    });

    describe('socket connect/close events events', function () {
        it('recognizes opened connection', function () {
            var connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true),
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
    });

    describe('socket connect/close events events', function () {
        it('recognizes opened connection', function () {
            var connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true),
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

            socket.launchEvent('error', "virhe");

            expect(cb.lastOpen.error).toBe('virhe');
            expect(cb.lastOpen.ok).toBe(null);
            expect(connection.isOpen()).toBe(false);
        });
    });

    describe('socket error events', function () {
        it('properly handes connection errors', function () {
            var connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true),
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

            socket.launchEvent('message', "kiva viesti");
            expect(cb.lastSent).toBe("kiva viesti");
        });
    });

    describe('socket connect/close events events', function () {
        it('recognizes opened connection', function () {
            var connection = new ConnectionEngineIO("http://localhost", 8000, "protocol", true),
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

            connection.sendMessage('joku viesti');
            expect(socket.lastSent).toBe('joku viesti');
        });
    });
});