// var nodeConsole = require('console'); 
// var myConsole = new nodeConsole.Console(process.stdout, process.stderr); 

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
        initMedia()
    }
}

async function initMedia(){
    console.log("start voice")
    const constaints = {
        audio :true,
        video : false
    }

    const stream = await navigator.mediaDevices.getUserMedia(constaints)
    window.mediaRecorder = new MediaRecorder(stream, null)
    window.mediaRecorder.ondataavailable = handleDataAvailable
}