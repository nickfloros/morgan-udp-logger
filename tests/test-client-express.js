var express = require('express'),
	morgan = require('morgan');

var app;

morgan.token('id', function getId(req) {
	return req.id
})

app = express();

app.use(morgan(':id :method :url :response-time'))

app.get('/', function (req, res) {
	res.send('hello, world!')
});

server = app.listen(8081, '127.0.0.1', function () {
	var port = server.address().port;
	console.log('server listening @ ', port);
});