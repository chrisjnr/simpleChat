var express = require('express'),
	app = express(),
	server= require('http').createServer(app),
	io = require('socket.io').listen(server);

	server.listen(process.env.PORT || 3000);

	app.get('/', function(req, res){
		res.sendFile(__dirname + '/index.html');
	});

	io.on('connection', function(socket){

		socket.emit('connected', {msg: 'Connection established'});

		socket.on('outgoing', (data)=>{
			console.log(data);
			io.sockets.emit('new message', {msg:data})
		});
	})
