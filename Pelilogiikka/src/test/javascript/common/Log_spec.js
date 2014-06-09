/*global log: true */
/*global describe: true */
/*global expect: true */
/*global it: true */
/*global spyOn: true */


describe('log', function () {
    "use strict";

    describe('lever setter/getter', function () {
        it('works', function () {
            log.setLevel(1);
            expect(log.getLevel()).toBe(1);
            log.setLevel(3);
            expect(log.getLevel()).toBe(3);
        });
    });

    describe('log functions', function () {

        it('error works without send', function () {
            expect(function () {
                log.error('error');
            }).not.toThrow();
        });

        it('warn without send', function () {
            expect(function() {
                log.warn('warn');
            }).not.toThrow();
        });

        it('info without send', function () {
            expect(function() {
                log.info('info');
            }).not.toThrow();
        });

        it('debug without send', function () {
            expect(function() {
                log.debug('debug');
            }).not.toThrow();
        });

        it('works with end', function () {
            expect(function() {
                log.error('error', true);
                log.warn('warn', true);
                log.info('info', true);
                log.debug('debug', true);
            }).not.toThrow();
        });

        it('thorwsToServer', function() {
            expect(function () {
                log.throwToServer(new Error("yay"));
            }).not.toThrow();
        });

        it('resetDebug works', function () {
            expect(function () {
                log.resetDebug(true);
                console.log("asdfsa");
                console.info("asdfsa");
                console.debug("asdfsa");
                log.resetDebug(false);
                console.log("asdfsa");
                console.info("asdfsa");
                console.debug("asdfsa");
                log.resetDebug(true);
                console.log("asdfsa");
                console.info("asdfsa");
                console.debug("asdfsa");
            }).not.toThrow();
        });
    });
});