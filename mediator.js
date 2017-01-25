var net = require('net');
var requestAgent = require('./agents/mediatorRequestAgent.js');
require('events').EventEmitter.defaultMaxListeners = Infinity;

var connections = [9001, 9002, 9003,9004, 9005, 9006];

var server = net.createServer(function(socket) {

    socket.on("connection", function () {
        console.log("new connection");
    });
    
    socket.on("data", function (data) {
        var msg = JSON.parse(data);
        requestAgent.processRequest(msg, function (callback) {
            console.log('mediator request precessed');
        });
    });
});

server.listen(9000, '127.0.0.1', function () {
    console.log("|____________________________________________________|");
    console.log("|                  Mediator connected                |");
    console.log("|____________________________________________________|");
    console.log("|  you can see log below                             |");
    console.log("|____________________________________________________|");
});
