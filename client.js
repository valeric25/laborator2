var net = require('net');
require('events').EventEmitter.defaultMaxListeners = Infinity;
var prompt = require('prompt');
var clientRequestAgent = require('./agents/clientRequestAgent.js');

/*
*  type: "get"
 sort: "asc | desc"
 filter: "Adrian"
 groupBy: "FI-121"
*
* */

var server = net.createServer(function(socket) {

    socket.on("connection", function () {
        console.log("new connection");
    });

    socket.on("data", function (data) {

        //console.log("data ->" + data);
        var msg = JSON.parse(data);

        clientRequestAgent.processRequest(msg, function () {
           console.log('client request processed');
        });
    });
});

server.listen(8000, '127.0.0.1', function () {
    console.log("|____________________________________________________|");
    console.log("|                  Client connected                  |");
    console.log("|____________________________________________________|");
    console.log("|  sort:    [ asc | desc ]                           |");
    console.log("|  filter:  'any string' - person name from list     |");
    console.log("|  gourpBy: [ FI-131 | FI-121 ]                      |");
    console.log("|____________________________________________________|");

    setTimeout(function() {
        showPrompt();
    },500);
});


function showPrompt() {
    prompt.start();
    prompt.colors = true;
    prompt.get(['sort', 'filter', 'groupBy'],
        function (err, result) {
            if (err) { return onErr(err);}

            if (result.sort != "" &&
                result.filter != "" &&
                result.groupBy != "") {

                // send to broker
                //var mess = new Message(result.queue, "post", result.text, "");

                var msg = {};
                msg.protocol = "mediator";
                msg.type = "get";
                msg.sort = result.sort;
                msg.filter = result.filter;
                msg.groupBy = result.groupBy;

                clientRequestAgent.processRequest(msg, function () {
                    console.log('client request processed');
                });

                showPrompt();

            } else {
                console.log("Empty fields - complete all the fields");
                showPrompt();
            }
        });
}