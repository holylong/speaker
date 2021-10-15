var WebSocket = require("ws");
var DataBean = require('./hexrtc_pb');
var ProtoBuf = require('protobufjs');


let ws = new WebSocket("ws://172.19.0.228:6655/hexrtc");

var msgdlg = new DataBean.Dialog();

msgdlg.setUserid("123");
console.log("enum:" + DataBean.Dialog.DialogType.LOGIN)
msgdlg.setType(DataBean.Dialog.DialogType.LOGIN);
msgdlg.setPassword("asd");

ws.on('open', function open(){
    var bf = msgdlg.serializeBinary();
    ws.send(bf);
})

ws.on('message', function incomming(message){
    console.log('received' + message);
    var replydlg = DataBean.Dialog.deserializeBinary(message);
    console.log("userid:" + replydlg.getUserid())
})