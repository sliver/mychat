var express = require('express');
var io = require('socket.io');

var app = express.createServer();
app.configure(function() {
    app.use(express.static(__dirname + '/public'));
});

app.listen(8000);


var sessions = {};

var socket = io.listen(app);
socket.on('connection', function(client) {

    sessions[client.sessionId] = client;

    client.send( 'You are online. Your session id is ' + client.sessionId );

    for (var i in sessions) {
        sessions[i].send(client.sessionId + ' connect');
    }

    client.on('message', function(message){

        for (var i in sessions) {
            if (i == client.sessionId)
                sessions[i].send('You say: ' + message);
            else
                sessions[i].send(client.sessionId + ' say: ' + message);
        }
    });

    client.on('disconnect', function(){
        delete sessions[client.sessionId];

        for (var i in sessions) {
            sessions[i].send(client.sessionId + ' disconnect');
        }
    });
});



