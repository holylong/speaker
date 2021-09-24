// var nodeConsole = require('console'); 
// var myConsole = new nodeConsole.Console(process.stdout, process.stderr); 

function asrClick(){
    console.log("start asr!!")
}

window.onload=function(){
    document.getElementById("asr_view").onclick = () => console.log("CLICK_MESSAGE")
}