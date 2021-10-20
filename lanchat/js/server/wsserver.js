var WSocket = require("nodejs-websocket")


class WsServer{
    constructor(port, url){
        this.port = port;
        this.url = url;
    };

    selfInitServer(){
        var server = WSocket.createServer(function(conn){
            conn.on("text", function(data){
                console.log(data);
                conn.send("hello client");
            });
            conn.on("close", function(code, reason){

            });
            conn.on("error", function(code, reason){

            });
        }).listen(this.port)
        console.log("server start");
    }

    selfSendMessage(message){
        //this.sock.send(message);
    }
}


module.exports = WsServer;