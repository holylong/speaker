
var schedule = require('node-schedule');



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
    }

    selfPost(url, hostname, host, ds){
        var requestMessage = "POST " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    }

    selfGet(url, hostname, host, ds){
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        console.log(requestMessage + index++);
        this.sock.write(requestMessage);
    }

    selfWaitGet(url, hostname, host, ds){
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\n\r\n";
        console.log(requestMessage + index++);
        this.sock.write(requestMessage);
    }
}


var net = require('net');
const { post } = require('request');
 
var HOST = '172.19.0.138';
var PORT = 8888;

var client = new net.Socket();

client.connect(PORT, HOST, function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});

//buffer = 0x0115e2b8 "GET /wait?peer_id=3 HTTP/1.0\r\n\r\n"
client.on('data', function(data) {
    console.log('DATA: ' + data);
    //parse login info
    if(data.toString().indexOf(localHost) !== -1){
        peerId = data.toString().split("\r\n\r\n")[1].split(",")[1];
        console.log(peerId);
    }else{
        console.log("can,t find we want");
    }
});

client.on('close', function() {
    console.log('Connection closed');
});

var httpClient = new HttpUtil(client);
//httpClient.selfPost("sign_in", "mac", HOST+ ":"+ PORT, null);
httpClient.selfGet("/sign_in", localHost,  HOST+ ":" + PORT, null);

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