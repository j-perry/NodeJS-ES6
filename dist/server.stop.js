'use strict';

var io = require('socket.io-client');
var socketClient = io.connect('http://localhost');

socketClient.on('connect', function () {
    socketClient.emit('npmStop');
    setTimeout(function () {
        process.exit(0);
    }, 1000);
});