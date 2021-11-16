'use strict';
var Peer = require('simple-peer')
var WebSocket = require("ws");
var ReconnectingWebSocket = require('./public/js/reconnecting-websocket')
var DataBean = require('./public/js/hexrtc_pb');
var toastr = require("toastr");

window.onload = function(){
    document.getElementById("userid").value = "123456";
    document.getElementById("startBtn").onclick = () => {
        console.log("start btn click");
        startLogin();
        //initMedia();
        //startClient();
    }

    //发送本地视频流
    document.getElementById("callBtn").onclick = () => {
        console.log("call button CLICK_MESSAGE")
        initMedia();
    }
    document.getElementById("dropBtn").onclick = () => {console.log("drop button CLICK_MESSAGE")}
}


function initLocalStream(stream){
    peer2 = new Peer({ initiator: true, stream: stream })
    peer2.on('signal', data => {
        //peer1.signal(data)
        //获取本地sdp
        console.log("peer2 signal:" + JSON.stringify(data));
        if(JSON.stringify(data).indexOf("offer") !== -1){
            sendOffer(data);
        }
    })

    peer2.on('stream', stream => {
        console.log("peer2 local stream ok");
    })
}

function sendOffer(sdp){
    var msgdlg = new DataBean.Dialog();
    userid = document.getElementById("userid").value
    if(userid != null && userid.length !== 0){
        msgdlg.setUserid(userid);
        if(peerid !== -1)
            msgdlg.setPeerid(peerid);
        else{
            peerid = document.getElementById("peerid").value;
            msgdlg.setPeerid(peerid);
        }

        console.log("enum:" + DataBean.Dialog.DialogType.TRANSFER)
        msgdlg.setType(DataBean.Dialog.DialogType.TRANSFER);
        var mediaSdp = {"type":"chat-signal", "data":sdp};
        var mediasdp2 = JSON.stringify(mediaSdp).replace(/(a=extmap-allow-mixed)\\r\\n/g, "").replace(/(a=rtpmap:35 AV1X\/90000)\\r\\n/g, "");
        console.log("rightly:" + mediasdp2);
        msgdlg.setMedia(mediasdp2);
        msgdlg.setPassword("asd");
        var bf = msgdlg.serializeBinary();
        ws.send(bf);
    }else{
        toastr.error("login error please input userid");
    }
}

//let ws = new WebSocket("ws://172.19.0.228:6655/hexrtc");
//let ws = new ReconnectingWebSocket("ws://192.168.1.3:6655/hexrtc");
let ws = new WebSocket("ws://192.168.1.3:6655/hexrtc");

var peer2 = "";
var peerid = -1;
var userid = '';

function initLocalPeer(sdp){
    let peer1 = new Peer({initiator:false, config: { iceServers: [] }, trickle:false});

    //应用远端sdp消息
    function initReceiver(sdp){
        console.log("initReceiver sdp:" + sdp);
        if(peer1.destroyed){
            console.log("===>> reinit peer1 ok");
            //peer1 = new Peer({initiator:false, config: { iceServers: [] }, trickle:false});
        }
        peer1.signal(sdp);
    }

    initReceiver(sdp);

    peer1.on('signal', function(signal){
        //var sdp = JSON.stringify(signal);
    
        var mediasdp = { "type":"chat-signal", "data":signal};
    
        console.log("peer1 signal:" + JSON.stringify(mediasdp))
        var msgdlg = new DataBean.Dialog();
        msgdlg.setUserid(userid);
        console.log("enum:" + DataBean.Dialog.DialogType.TRANSFER)
        msgdlg.setType(DataBean.Dialog.DialogType.TRANSFER);
        msgdlg.setPassword("asd");
        msgdlg.setMedia(JSON.stringify(mediasdp))
        msgdlg.setPeerid(peerid);
        var bf = msgdlg.serializeBinary();
        ws.send(bf);
    })
    
    peer1.on('data', function(data){
        console.log("peer1 data:" + JSON.stringify(data))
    })
    
    peer1.on('error', function(message){
        console.log("peer1 error:" + message);
    })
    
    peer1.on('stream', function(stream){
        console.log("peer1 stream:" + JSON.stringify(stream))
        const videoElement = document.getElementById("remotePreview")
        var preHeight = videoElement.style.height;
        if(videoElement !== null && stream !== null){
            videoElement.srcObject = stream;
            console.log("get stream ok");
            videoElement.style.height = preHeight;
            videoElement.play();
            videoElement.onloadedmetadata = e => {
                videoElement.play();
                console.log("play stream ok");
                toastr.info("recv remote stream ok");
                };
        }else{
            console.log("video element is null");
        }
    })
}

ws.on('open', function open(){
    toastr.info('connect server:' + "ws://192.168.1.3:6655/hexrtc" + " ok!")
})

ws.on('message', function incomming(message){
    var replydlg = DataBean.Dialog.deserializeBinary(message);
    if(replydlg.getType() === DataBean.Dialog.DialogType.TRANSFER){
        var msgsig = replydlg.getMedia();

        if(msgsig.indexOf("offer") >= 0 && JSON.parse(msgsig).data.type == "offer"){
            console.log(msgsig);
            var sdp = JSON.stringify(JSON.parse(msgsig).data);
            //initReceiver(sdp);
            initLocalPeer(sdp);
            peerid = replydlg.getUserid();
        }else if(msgsig.indexOf("answer") >= 0 && JSON.parse(msgsig).data.type == "answer"){
            var sdp = JSON.stringify(JSON.parse(msgsig).data);
            initSender(sdp);
        }

    }else if(replydlg.getType() === DataBean.Dialog.DialogType.LOGIN){
        toastr.info("login success id is:" + replydlg.getUserid());
    }
    console.log("userid:" + replydlg.getUserid() + " peerid:" + replydlg.getPeerid())
})

ws.on("error", function errorcallback(message){
    toastr.error("error:" + message);
})

//把刚才干的事情重写一遍
function reconnect (){
    rews = WebSocket("ws://192.168.1.3:6655/hexrtc");
    rews.onmessage = function(message){
        var replydlg = DataBean.Dialog.deserializeBinary(message);
        if(replydlg.getType() === DataBean.Dialog.DialogType.TRANSFER){
            var msgsig = replydlg.getMedia();
    
            if(msgsig.indexOf("offer") >= 0){
                console.log(msgsig);
                var sdp = JSON.stringify(JSON.parse(msgsig).data);
                initReceiver(sdp);
                peerid = replydlg.getUserid();
            }
        }else if(replydlg.getType() === DataBean.Dialog.DialogType.LOGIN){
            toastr.info("login success id is:" + replydlg.getUserid());
        }
        console.log("userid:" + replydlg.getUserid() + " peerid:" + replydlg.getPeerid())
    };
    rews.onclose = function(){
        //dosomthing
    };
}
//每隔5秒去调用一次
var disConnect = function(){
    setTimeout(function(){
         reconnect();
    },5000);
}
//函数放在onclose里
ws.onclose = disConnect;


// ws.open();

// ws.onmessage = function(msg){
//     console.log('msg:',msg);
//     //do something
// };

// ws.onclose = function(){
//     console.log('closed....');
// };

function initSender(sdp){
    console.log("initSender sdp:" + sdp);
    peer2.signal(sdp);
}

function startLogin(){
    var msgdlg = new DataBean.Dialog();
    userid = document.getElementById("userid").value
    if(userid != null && userid.length !== 0){
        msgdlg.setUserid(userid);
        console.log("enum:" + DataBean.Dialog.DialogType.LOGIN)
        msgdlg.setType(DataBean.Dialog.DialogType.LOGIN);
        msgdlg.setPassword("asd");
        var bf = msgdlg.serializeBinary();
        ws.send(bf);
    }else{
        toastr.error("login error please input userid");
    }
}

//peer = new Peer({initiator:true, stream:stream, config: { iceServers: [] }, trickle:false});
    

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
            audio :true,
            video:true
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
            // video: {
            //     mandatory: {
            //       chromeMediaSource: 'desktop',
            //     //   chromeMediaSourceId: source.id
            //     }
            //   }
        }
        navigator.mediaDevices.getUserMedia(constaints).then(stream =>{
            const videoElement = document.getElementById("localPreview")
            if(videoElement !== null){
                videoElement.srcObject = stream;
                initLocalStream(stream);
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