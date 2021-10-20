var ws = require("nodejs-websocket")


class WsServer{
    constructor(sock, port){
        this.sock = sock;
        this.port = port;
    };

    selfInitServer(){
        var server = wc.createServer(function(conn){
            conn.on("text", function(data){
                console.log(data);
            });
            conn.on("close", function(code, reason){

            });
            conn.on("error", function(code, reason){

            });
        }).listen(this.port)
        console.log("server start");
    }
}
