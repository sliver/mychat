
function setup() {

    showMessage('Connecting...');

    var socket = io.connect();

    socket.on('connect', function() {
            showMessage('Connected');
        });

    socket.on('message', function(message) {
            showMessage(message);
        });

    socket.on('disconnect', function() {
            showMessage('You are disconnect');
        });

    $('#chat_form').submit(function(event) {

        var target = event.target;

        socket.send(target.chat_text.value);
        target.chat_text.value = '';

        target.chat_text.focus();

        return false;
        });
}


function sendMessage(message) {

    socket.send(message);
}

function showMessage(message) {

    $('#chat_board').append('<div>' + message + '</div>');
}

