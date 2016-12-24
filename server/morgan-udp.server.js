var callBack = null,
	dgram = require('dgram'),
	udpServer = dgram.createSocket('udp4'),
	AccessRecordFactory = require('../lib/factories/access-record.factory');

udpServer.on('error', (err) => {
	console.log(`udpServer error:\n${err.stack}`);
	udpServer.close();
});

udpServer.on('message', (msg, rinfo) => {
	var payload = AccessRecordFactory.parser(msg.toString());
	if (callBack) {
		callBack(payload);
	}
});

udpServer.on('listening', () => {
	var address = udpServer.address();
	console.log(`udpServer listening ${address.address}:${address.port}`);
});
/**
 * set port to listend for inbound messages ..
 */
udpServer.bind(41234);

module.exports = {
	bind: function (cb) {
		callBack = cb;
	}
};