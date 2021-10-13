'use strict';
var Peer = require('simple-peer')
var WebSocket = require("ws");
var DataBean = require('./public/js/hexrtc_pb');

window.onload=function(){
    document.getElementById("asr_view").onclick = () => console.log("CLICK_MESSAGE")
    document.getElementById("startBtn").onclick = () => {
        //initMedia()
        startClient();
    }
}

let ws = new WebSocket("ws://172.19.0.228:6655/hexrtc");
let peer = new Peer({initiator:false, config: { iceServers: [] }, trickle:false});
var peerid = '';

ws.on('open', function open(){
    var msgdlg = new DataBean.Dialog();
    msgdlg.setUserid("123");
    console.log("enum:" + DataBean.Dialog.DialogType.LOGIN)
    msgdlg.setType(DataBean.Dialog.DialogType.LOGIN);
    msgdlg.setPassword("asd");
    var bf = msgdlg.serializeBinary();
    ws.send(bf);
})

ws.on('message', function incomming(message){
    var replydlg = DataBean.Dialog.deserializeBinary(message);
    if(replydlg.getType() === DataBean.Dialog.DialogType.TRANSFER){
        var msgsig = replydlg.getMedia();
        
        if(msgsig.indexOf("offer") >= 0){
            console.log(msgsig);
            var sdp = JSON.stringify(JSON.parse(msgsig).data);
            initReceiver(sdp);
            peerid = replydlg.getUserid();
        }
    }
    console.log("userid:" + replydlg.getUserid() + " peerid:" + replydlg.getPeerid())
})

let peerConnection = null;
async function initRemoteStream(){
    const connectionClient = new ConnectionClient();
    peerConnection = await connectionClient.createConnection()
}

function initReceiver(sdp){
    peer.signal(sdp);
    const videoElement = document.getElementById("localPreview")
    if(videoElement !== null && peer.stream !== null){
        videoElement.srcObject = peer.stream;
        console.log("init stream once");
        videoElement.onloadedmetadata = e => {
            videoElement.play();
            };
    }else{
        console.log("video element is null");
    }
}

//peer = new Peer({initiator:true, stream:stream, config: { iceServers: [] }, trickle:false});
    
peer.on('signal', function(signal){
    //var sdp = JSON.stringify(signal);

    var mediasdp = { "type":"chat-signal", "data":signal};

    console.log("signal:" + JSON.stringify(mediasdp))
    var msgdlg = new DataBean.Dialog();
    msgdlg.setUserid("123");
    console.log("enum:" + DataBean.Dialog.DialogType.TRANSFER)
    msgdlg.setType(DataBean.Dialog.DialogType.TRANSFER);
    msgdlg.setPassword("asd");
    msgdlg.setMedia(JSON.stringify(mediasdp))
    msgdlg.setPeerid(peerid);
    var bf = msgdlg.serializeBinary();
    ws.send(bf);
})

peer.on('data', function(data){
    console.log("data:" + JSON.stringify(data))
})

peer.on('stream', function(stream){
    console.log("stream:" + JSON.stringify(stream))
    const videoElement = document.getElementById("localPreview")
    if(videoElement !== null && stream !== null){
        videoElement.srcObject = stream;
        console.log("get stream ok");
        videoElement.play();
        videoElement.onloadedmetadata = e => {
            videoElement.play();
            console.log("play stream ok");
            };
    }else{
        console.log("video element is null");
    }
})

async function initLocalStream(){
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
        
    });
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