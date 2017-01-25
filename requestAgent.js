// // used to prepare and send requests
//
// var net = require('net');
// var dictionarAgent = require('./agents/dictionarAgent.js');
//
// // all nodes to connect
// var mediatorPort = 8000;
// var connections = [9001, 9002, 9003,9004, 9005, 9006];
//
//
// //variables for node
// var nodePort = 0;
// var nodeConnections = 0;
// var nodeInfo = [];
// var clientRequest = {};
//
//
// var nodeWithMaxConnections = {};
// var maxConn = 0;
//
//
// var setNodeInfo = function (port, info, connections) {
//     nodePort = port;
//     nodeInfo = info;
//     nodeConnections = connections;
// };
//
//
// var processRequest = function (request, callback) {
//
//     if (request.protocol == "client") {
//         processClientRequest(request, function(call) {
//             // do stuff
//         });
//     }
//
//
//     if (request.protocol == "node") {
//         processNodeRequest(request, function (call) {
//
//
//            // callback();
//
//         })
//     }
// };
//
//
//
// var processClientRequest = function(request, callback) {
//     switch (request.type) {
//         case "get":
//
//
//             clientRequest = request;
//             // do process
//             // when all nodes are asked, callback is called
//             askNodesForConnections(function (callback) {
//                 console.log("All nodes are asked for connections");
//             });
//             break;
//
//         case "post":
//             // do process
//             callback("");
//             break;
//     }
// };
//
//
// var processNodeRequest = function(request, callback) {
//
//     // if (request.type == "post") {
//     //
//     //     console.log("in post");
//     // }
//
//
//     switch (request.type) {
//         case "get":
//             if ("method" in request) {
//                 // return nr of connections
//
//                 if (request.method == 'nrOfNodes') {
//
//                     sendResponseWithNodes(function (call) {
//                         console.log("Node " + nodePort +" sended nr of connection with succes");
//                         // callback();
//                     });
//                 }
//             }
//
//
//             if ("filter" in request) {
//                // console.log("in filter");
//                 sendDataFromBestNode(request.filter ,function (call) {
//
//                 });
//
//
//             }
//             break;
//
//
//
//         case "post":
//
//             if (request.hasOwnProperty('connections')) {
//
//               if (request.connections > maxConn) {
//                   maxConn = request.connections;
//                   nodeWithMaxConnections = request;
//               }
//
//               // get info after 2 sec when all nodes has responded
//                 setTimeout(function () {
//                     getInfoFromBestNode(request,function (callback) {
//                         // node ask for info
//                     });
//                 }, 2000)
//
//             }
//
//             if (request.hasOwnProperty('response')) {
//
//                 sendDataToClient(clientRequest.order, clientRequest.group,function (call) {
//                     // data has sended to client
//                 } );
//             }
//             break;
//
//     }
// };
//
//
//
// //===========================================================
// // node responses
// //============================================================
// var askNodesForConnections = function(callback) {
//
//     connections.forEach(function (item, index, array) {
//         console.log("in for index "+ index + " " + item);
//
//         var client = new net.Socket();
//         client.connect(item, '127.0.0.1', function () {
//
//             // create node protocol class
//             console.log('Connected');
//             var req = {};
//             req.protocol = "node";
//             req.port = 8000;
//             req.type = "get";
//             req.method = "nrOfNodes";
//             client.write(JSON.stringify(req));
//         });
//         // client.destroy();
//
//
//         // is last element
//         if (index == connections.length-1) {
//             callback("last");
//         }
//     });
// };
//
// var sendResponseWithNodes = function(callback) {
//     var client = new net.Socket();
//     client.connect(8000, '127.0.0.1', function () {
//
//         var req = {};
//         req.protocol = "node";
//         req.port = nodePort;
//         req.type = "post";
//         req.connections = nodeConnections;
//         client.write(JSON.stringify(req));
//         callback();
//     });
// };
//
// var sendResponseWithInfo = function (data, port, callback) {
//     var client = new net.Socket();
//     client.connect(8000, '127.0.0.1', function () {
//
//         var req = {};
//         req.protocol = "node";
//         req.port = port;
//         req.type = "post";
//         req.connections = nodes;
//         client.write(JSON.stringify(req));
//         callback();
//     });
// };
//
// //========================================================
//
//
//
// //
//
// var getInfoFromBestNode = function (request, callback) {
//     var client = new net.Socket();
//
//     client.connect(nodeWithMaxConnections.port, '127.0.0.1', function () {
//
//         var req = {};
//         req.protocol = "node";
//         req.port = 8000;
//         req.type = "get";
//         req.filter = clientRequest.filter; //request.filter;
//         client.write(JSON.stringify(req));
//         //callback();
//     });
// };
//
//
// var sendDataFromBestNode = function (filter, callback) {
//     var client = new net.Socket();
//     client.connect(8000, '127.0.0.1', function () {
//
//
//         var req = {};
//         req.protocol = "node";
//         req.type = "post";
//
//         console.log("date aici", nodeInfo);
//
//         dictionarAgent.filterDictionar(nodeInfo, filter, function (result) {
//
//             console.log("date filtrate !!!" + result);
//
//         dictionarAgent.filterDictionar(nodeInfo, filter, function (result) {
//
//             client.on('end', function(){
//                 var obj = JSON.parse(result);
//                 console.log("date filtrate !!!" + obj);
//             });
//            // console.log("date filtrate !!!" + JSON.parse(result));
//
//             req.response  = result; // result set filtred data;
//             client.write(JSON.stringify(req));
//         });
//
//
//         //callback();
//     });
// };
//
//
//
// var sendDataToClient = function (order, group, callback) {
//     var client = new net.Socket();
//     client.connect(8500, '127.0.0.1', function () {
//
//         var temp = {};
//
//         var req = {};
//         req.protocol = "client";
//         req.type = "post";
//
//         dictionarAgent.orderDictionar(nodeInfo,order, function (result) {
//             temp  = result; // set filtred data;
//             //client.write(JSON.stringify(req));
//         });
//
//         dictionarAgent.groupDictionar(temp, group, function (result) {
//             req.response  = result;
//             client.write(JSON.stringify(req));
//         });
//
//
//         //callback();
//     });
// };
//
//
//
//
//
//
//
//
//
// //general
// module.exports.setNodeInfo = setNodeInfo;
//
// module.exports.processRequest = processRequest;
//
// module.exports.processClientRequest = processClientRequest;
// module.exports.processNodeRequest = processNodeRequest;
//
//
// // node functions
// module.exports.askNodesForConnections = askNodesForConnections;
// module.exports.sendResponseWithNodes = sendResponseWithNodes;
// module.exports.sendResponseWithInfo = sendResponseWithInfo;
// module.exports.getInfoFromBestNode = getInfoFromBestNode;
//
//
//
//
//
//
// // function connectionHandler(socket){
// //
// //
// //     var node = new net.Socket();
// //     node.connect(item, '127.0.0.1', function () {
// //         // do here
// //         console.log("Node " + myPort + " connected to child node on port: " + item);
// //     });
// //
// //     node.on('error', function (err) {
// //         console.log(err);
// //     });
// //
// //    // sockets.append(socket);
// //     var maxConnOnNode = 0;
// //
// //     socketTCP.on('data', function () {
// //         var msg = JSON.parse(data);
// //         console.log(msg);
// //
// //         if (msg.connections > maxConnOnNode) {
// //             maxConnOnNode = msg.connections;
// //         }
// //     });
// //
// //     socketTCP.on('error', function (err) {
// //         console.log(err);
// //     });
// // }
