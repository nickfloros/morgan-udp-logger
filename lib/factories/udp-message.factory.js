'use strict';

var Buffer = require('buffer').Buffer,
	hostName = require("os").hostname();

module.exports = {
	/**
	 * create a signature of the client by adding hostname to the client id
	 * @param  {string} clientId - identifies client instance
	 * @return {string}          - signature of the client
	 */
	signature: function signature(clientId) {
		return ',' + hostName + ',' + clientId + ',';
	},

	/**
	 * creates a Buffer containing the message we want to post. Fields are ',' seperated. 
	 * THe message is prefixed with a time stamp , that is rounded to the nearest second, followed by the client id
	 * @param  {string} clientId - unique id of the client that posts the message
	 * @param  {string} payload  - message to be post
	 * @return {Buffer}          - message we we want to post
	 */
	create: function create(signature, line) {
		var time = new Date();
		time.setMilliseconds(0); // round up to time to nearest second 
		var strMsg = time.getTime() + signature + line;
		var message = new Buffer(strMsg.length);
		message.write(strMsg);
		return message;
	}
};