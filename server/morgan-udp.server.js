var dgram = require('dgram'),
	server = dgram.createSocket('udp4'),
	AccessRecordFactory = require('../lib/factories/access-record.factory');

server.on('error', (err) => {
	console.log(`server error:\n${err.stack}`);
	server.close();
});


server.on('message', (msg, rinfo) => {
	console.log(AccessRecordFactory.parser(msg.toString()));
});

server.on('listening', () => {
	var address = server.address();
	console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(41234);