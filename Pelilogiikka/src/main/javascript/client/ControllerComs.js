/**
* This encapsulate all the comunications stuff
* @constructor
*/
function ControllerComs() {
	this.hostname = location.hostname;
	this.port = CLIENT_PORT;
    this.protocol = JSONRPC_PROTOCOL;

	this.userID = USERID;

	this.connection = new ConnectionEngineIO(this.hotname, this.port, this.protocol, true);
    this.rpc = new PeliRPC(this.connection);

    this.serverMessenger = new ServerDebugMessenger();
    //this.serverMessenger.send("howdy ho!");
}

/**
 * Used to initially open the connection
 * @param {function} callback - will be called when connection opened
 */
ControllerComs.prototype.open = function(callback) {
    this.rpc.connect(callback);
};

/**
 * close connection
 */
ControllerComs.prototype.close = function() {
    this.rpc.close();
};

/**
 * This will send messages directly to the server
 * @param {function} msg 
 */
ControllerComs.prototype.serverMsg = function(msg) {
    this.serverMessenger.send(msg);
};

/**
 * Request a gameslot
 * @param {function} callback - this will be called with the return value
 */
ControllerComs.prototype.joinGame = function(callback) {
    this.rpc.callRpc('joinGame', [this.userID], this, callback);
};

/**
 * Set player position
 * @param {number} x - relative position on screen [0,1]
 * @param {number} y - relative position on screen [0,1]
 */
ControllerComs.prototype.position = function(x, y) {
    this.rpc.callRpc('position', [this.userID, x, y], this, null);
};

/**
 * Launch swipe action for player
 * @param {number} x - 
 * @param {number} y - 
 * @param {number} sincePreviousTime - 
 */
ControllerComs.prototype.swipe = function(x, y, sincePreviousTime) {
    this.rpc.callRpc('swipe', [this.userID, x, y, sincePreviousTime], this, null);
};
