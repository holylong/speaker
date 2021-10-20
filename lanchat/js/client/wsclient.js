var WebSocket = require("ws");
// var DataBean = require('./hexrtc_pb');
// var ProtoBuf = require('protobufjs');


let ws = new WebSocket("ws://172.19.0.228:6655/hexrtc");

ws.on('open', function open(){
    ws.send("hello server");
})

ws.on('message', function incomming(message){
    console.log('received ' + message);
})