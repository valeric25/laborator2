var net = require('net');
var fs = require('fs');
//var requestAgent = require('./requestAgent.js');
var nodeRequestAgent = require('./agents/nodeRequestAgent.js');


// port personal | porturi la care se conecteaza | range  start 1 end 18
var args = process.argv.slice(2);
var myPort = args[0];
var connections = args[1].split(","); //args[1];

var startValue = args[2];
var endValue = args[3];


var myData = [];


var server = net.createServer(function(socket) {

    socket.on("connection", function () {
        console.log("new connection");
    });

    socket.on("data", function (data) {
        console.log("data ->" + data);
        var msg = JSON.parse(data);

        nodeRequestAgent.processRequest(msg, function (callback) {
            console.log('Node ' +myPort+ " processed request");
        });
    });
});

server.listen(myPort, '127.0.0.1', function () {


    console.log("Node " +myPort+ " started !");
    if  (connections[0] == '0') {
        connections = [];
    }

    // function to read from file my info
    readMyData();

    // send to agent all node data
    nodeRequestAgent.setNodeInfo(myPort, myData, connections);

    // connect to child nodes
    // connectToMyNodes();

});

/*var dataRead = function(){
    fs.readFile('persistentData.txt', 'utf-8', function (err, data) {
        if (err) throw  err;

        var parsedData = JSON.parse(data);

        for (var i=startValue; i< endValue; i++ ) {
            myData.push(parsedData[i]);
        }
        // console.log(myData);
    })
};*/

function readMyData() {

   fs.readFile('./persistentData.txt', 'utf-8', function (err, data) {
        if (err) throw  err;

        var parsedData = JSON.parse(data);

        for (var i=startValue; i< endValue; i++ ) {
            myData.push(parsedData[i]);
        }
       // console.log(myData);

    });

}


/*
function connectToMyNodes() {


    //var some = Array.from(connections);
    //var array = connections.split(",");
  //  console.log("aici " + connections);

    setTimeout(function() {


    connections.forEach(function (item) {

        console.log("try contect to " + item);

        if (item != 0) {

            var node = new net.Socket();
            node.connect(item, '127.0.0.1', function () {
                // do here
                console.log("Node " + server.remotePort + " connected to child node on port: " + item);
            });

            node.on('error', function (err) {
                console.log(err);
            });
        }
    })

    },5);

}
*/

