'use strict';

var dgram = require('dgram'),
	UdpMessageFactory = require('./factories/udp-message.factory'),
	morgan = require('morgan');

/**
 * Stream udp constractor 
 * @param {string} clientId - client id
 * @param {string} udpHost  - host the udp listener is running
 * @param {int|string} udpPort  - udp port the listener is listening
 */
var MorganUdpStream = function (clientId, udpHost, udpPort) {
	this.lines = 0;
	this.client = dgram.createSocket('udp4');
	this.svcSignature = UdpMessageFactory.signature(clientId);
	this.udpPort = udpPort ? udpPort >> 0 : 41234;
	this.udpHost = udpHost ? udpHost : 'rh0113p';
};

/**
 * posts a message to the udp listener
 * @param  {string} line - morgan message details fields are ',' seperated
 */
MorganUdpStream.prototype.write = function (line) {
	var msgBufer = UdpMessageFactory.create(this.svcSignature, line);

	// message we are sending hopefull fits with the default UDP packet size
	this.client.send(msgBufer, 0, msgBufer.length, this.udpPort, this.udpHost, function (err, bytes) {
		// we don't care if we had an error ... 
	});
};

module.exports = {
	/**
	 * create a udp instance process morgan events. 
	 * @param  {Object}  params - params block for configuring the client
	 * @param  {string}  params.clientId - this is combined with host name to uniqley the source of the message
	 * @param  {string}  params.host - names the server the udp listener is running
	 * @param  {int}     params.port - defines the port the udp listener is expecting to receive messages
	 * @return {Morgan} 			 - instance that will be bound to the express server instance
	 */
	bind: function (params) {
		return morgan(':method, :url, :status, :res[content-length], :response-time', {
			stream: new MorganUdpStream(params.clientId, params.host, params.port)
		});
	},
};