describe('sendServerMessage.js', function() {

    //Specs
    describe('sendServerMessage global function', function() {

        it('sends messages to the server', function() {   
            expect(function() { 
                sendServerMessage("viesti");
            }).not.toThrow();
            expect(sendServerMessage._socket.lastSent).toBe('viesti');
            expect(function() { 
                sendServerMessage("toinen viesti");
            }).not.toThrow();

            expect(sendServerMessage._socket).not.toBe(undefined);
            expect(sendServerMessage._socket).not.toBe(null);
            expect(sendServerMessage._socket.lastSent).toBe('toinen viesti');
        });

        it('recovers from socket errors', function() {   
            expect(function() { 
                sendServerMessage("viesti");
            }).not.toThrow();

            sendServerMessage._socket.launchEvent('error', 'virhe');

            expect(function() { 
                sendServerMessage("toinen viesti");
            }).not.toThrow();
            expect(sendServerMessage._socket.lastSent).toBe('toinen viesti');
        });

        it('recovers from socket disconnect', function() {   
            expect(function() { 
                sendServerMessage("viesti");
            }).not.toThrow();

            sendServerMessage._socket.launchEvent('close');

            expect(function() { 
                sendServerMessage("toinen viesti");
            }).not.toThrow();
            expect(sendServerMessage._socket.lastSent).toBe('toinen viesti');
        });
    });
});