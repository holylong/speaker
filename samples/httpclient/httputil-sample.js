var schedule = require('node-schedule');
var net = require('net');
const { post } = require('request');
var events = require("events");
//var tcpHttpUtil = require('../../public/js/httputil')
//import HttpUtil from "../../public/js/httputil.js";  // "type": "module",
//buffer = 0x0030e5f0 "GET /sign_in?linux HTTP/1.1\r\nhost: 172.19.0.138:8888\r\nConnection: close\r\n\r\n"

var localHost = "mac";
var peerId = 0;
var index = 0;
class HttpUtil{
    constructor(sock){
        this.sock = sock;
        //this.url = url;
    };

    selfPost(url, hostname, host, ds){
        var requestMessage = "POST " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    selfGet(url, hostname, host, ds){
        //var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1" + "\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    selfWaitGet(url, hostname, host, ds){
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    hpSendData = msg => {
        this.sock.write(msg);
    };
}

var client = new net.Socket();
var httpClient = new HttpUtil(client);
var HOST = '172.19.0.138';
var PORT = 8888;

client.connect(PORT, HOST, function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

//创建事件监听的一个对象
var  emitter = new events.EventEmitter();

//监听事件some_event
emitter.addListener("some_event",function(){
    //SendWaitGet();
    var index = setInterval(function(){
    httpClient.selfWaitGet("/wait", "peer_id=" + peerId,  "", null);
    }, 2000);
});

async function SendWaitGet(){
    await httpClient.selfWaitGet("/wait", "peer_id=" + peerId,  "", null);
}

//buffer = 0x0115e2b8 "GET /wait?peer_id=3 HTTP/1.0\r\n\r\n"
//buffer = 0x0133e2b0 "GET /wait?peer_id=1 HTTP/1.0\r\n\r\n"
//GET /wait?peer_id=2 HTTP/1.1
client.on('data', function(data) {
    console.log('DATA: ' + data);
    //parse login info

    if(data.toString().indexOf("close") != -1){
        if(data.toString().indexOf(localHost) !== -1){
            peerId = data.toString().split("\r\n\r\n")[1].split(",")[1];
            console.log("current user:" + peerId);
            client.end();
            //httpClient.selfWaitGet("/wait", "peer_id=" + peerId,  "", null);
            //var requestMessage = "GET " + "/wait" + '?' + "peer_id=" + peerId + " HTTP/1.1\r\n\r\n";
            //httpClient.hpSendData(requestMessage);
            //client.write(requestMessage);
            //触发事件some_event
            // emitter.emit("some_event");
        }else{
            console.log("can,t find we want peerid");
        }
        client.end();
    }else{
        console.log("can,t find we want close signal");
    }
});

client.on('end',function(){
    console.log("exit");
    client.end();
});
client.on('error',function(){
    console.log("error ocr");
    client.end();
});

client.on('close', function() {
    console.log('Connection closed');
    
    client.connect(PORT, HOST, function(){
        console.log('CONNECTED TO: ' + HOST + ':' + PORT);
        httpClient.selfWaitGet("/wait", "peer_id=" + peerId,  "", null);
    });
});

//httpClient.selfPost("sign_in", "mac", HOST+ ":"+ PORT, null);
httpClient.selfGet("/sign_in", localHost,  HOST+ ":" + PORT, null);
// httpClient.selfWaitGet("/wait", "peer_id=" + peerId,  "", null);

// var index = setInterval(function(){
//     httpClient.selfWaitGet("/wait", "peer_id=" + peerId,  "", null);
// }, 2000);
// console.log(index);

// function scheduleCronstyle(){
//     //schedule.scheduleJob('30 * * * * *', function(){
//       schedule.scheduleJob('1', function(){
//         console.log('scheduleCronstyle:' + new Date());
//     }); 
// }

// scheduleCronstyle();