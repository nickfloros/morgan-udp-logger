var express = require('express'),
	morganUdpClient = require('../lib/client');

var app;

app = express();

app.use(morganUdpClient.bind({
	clientId: 'x',
	host: 'localhost'
}));

app.get('/', function (req, res) {
	res.send('hello, world!')
});

server = app.listen(8081, '127.0.0.1', function () {
	var port = server.address().port;
	console.log('server listening @ ', port);
});