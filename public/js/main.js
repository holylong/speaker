'use strict';

// var nodeConsole = require('console'); 
// var myConsole = new nodeConsole.Console(process.stdout, process.stderr); 
var net = require('net');
// const ConnectionClient = require('./peerconnection');
var HttpUtil = require('./public/js/httputil')

function asrClick(){
    console.log("start asr!!")
}

function handleDataAvailable(e) {
    //recordedChunks.push(e.data)
    console.log("data size:" + e.data)
  }

window.onload=function(){
    document.getElementById("asr_view").onclick = () => console.log("CLICK_MESSAGE")
    document.getElementById("startBtn").onclick = () => {
        //initMedia()
        startClient();
    }
}

var client = new net.Socket();
var httpClient = new HttpUtil(client);
var HOST = '172.19.0.138';
var PORT = 8888;
var localHost = 'mac';
var peerId = "";
client.connect(PORT, HOST, function(){
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
});
function startClient(){
    httpClient.selfGet("/sign_in", localHost,  HOST+ ":" + PORT, null);
}

client.on('data', function(data) {
    console.log('DATA: ' + data);
    //parse login info

    if(data.toString().indexOf("close") != -1){
        if(data.toString().indexOf(localHost) !== -1){
            peerId = data.toString().split("\r\n\r\n")[1].split(",")[1];
            console.log("current user:" + peerId);
            //client.end();
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

let peerConnection = null;
async function initRemoteStream(){
    const connectionClient = new ConnectionClient();
    peerConnection = await connectionClient.createConnection()
}

async function initMedia(){
    console.log("start voice")
    let exArray = [];
    await navigator.mediaDevices.enumerateDevices().then(function(sourceinfos){
        for (var i = 0; i < sourceinfos.length; ++i) {
            if (sourceinfos[i].kind == 'videoinput') {
                exArray.push(sourceinfos[i].deviceId);
            }
        }
    }).then(()=>{
        let deviceId = exArray[exArray.length - 1];
        const constaints = {
            audio :false,
            // video: { 
            //     deviceId: deviceId
            // } 
            // video : {
            //     mandtory:{
            //         width:1280,
            //         height:720,
            //         deviceId:deviceId
            //     }
            // }
            video: {
                mandatory: {
                  chromeMediaSource: 'desktop',
                //   chromeMediaSourceId: source.id
                }
              }
        }
        navigator.mediaDevices.getUserMedia(constaints).then(stream =>{
            const videoElement = document.getElementById("localPreview")
            if(videoElement !== null){
                videoElement.srcObject = stream;
                videoElement.onloadedmetadata = e => {
                    videoElement.play();
                  };
            }else{
                console.log("video element is null");
            }

            // window.mediaRecorder = new MediaRecorder(stream, null)
            // window.mediaRecorder.ondataavailable = handleDataAvailable
        })
    })

}