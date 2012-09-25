#!/usr/bin/env node

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    response.end();
});
server.listen('9000', function() {
    console.log('listen:9000');
});

ws = new WebSocketServer({
    'httpServer': server 
});

ws.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    console.log('connection accepted.');
    connection.on('message', function(message) {
        console.log(message.utf8Data);
        connection.sendUTF(message.utf8Data);
    });
    connection.on('close', function(reasonCode, description) {
        console.log('Disconnected.');
    });
});
