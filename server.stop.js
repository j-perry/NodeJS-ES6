var io = require('socket.io-client');
var socketClient = io.connect('http://localhost');

socketClient.on('connect', () => {
    socketClient.emit('npmStop');
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});