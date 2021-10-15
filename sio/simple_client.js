const io = require("socket.io-client");

const socket  = io.io("http://172.19.0.228:3033");

socket.on("connect", ()=>{
    console.log("connect:" + socket.id);
});

socket.on("disconnect", ()=>{
    console.log("disconnect:" + socket.id);
});

socket.on("data", data=>{
    console.log("data:" + data);
});

