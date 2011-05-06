var socket = new io.Socket();

function setup() {

    showMessage('Connecting...');
    socket.connect();

    socket.on('connect', function(){
	    console.log('on connection');
	});

    socket.on('message', function(message){
            showMessage(message);
	});

    socket.on('disconnect', function(){
            showMessage('You are offline');
	});

    $('#chat_button').click(function(){
        var chat_text = $('#chat_text');
        socket.send(chat_text.val());
        chat_text.val('');
    });
}


function sendMessage(message) {

    socket.send(message);
}

function showMessage(message) {

    $('#chat_board').append('<div>' + message + '</div>');
}