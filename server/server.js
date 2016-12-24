'use strict';

var app = require('express')(),
	udpServer = require('./morgan-udp.server'),
	http = require('http').Server(app),
	io = require('socket.io')(http);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
	console.log('a user connected');
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});

udpServer.bind(function (payload) {
	console.log(payload);
});