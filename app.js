var express = require('express');
var app = express.createServer();
var io = require('socket.io').listen(app);

app.listen(8000);

app.configure(function() {
    app.use(express.static(__dirname + '/public'));
    });

io.configure(function() {
    });

io.sockets.on('connection', function(socket) {

    socket.send('Your id is ' + socket.id);
    socket.broadcast.send(socket.id + ' connected');

    socket.on('message', function(message){
        socket.send('You say: ' + message);
        socket.broadcast.send(socket.id + ' say: ' + message);
        });

    socket.on('disconnect', function() {
        socket.broadcast.send(socket.id + ' disconnected');
        });
});



