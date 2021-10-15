var net = require('net');

var i = 0;

var clientList = [];

var server = net.createServer(function(socket){
    socket.name = '用户'+(++i);
    socket.write('[聊天室]欢迎'+socket.name+'\n');
    clientList.push(socket);

    function showCients(){
        console.log('[当前在线用户]:');
        for(var i = 0;i<clientList.length;i++){
            console.log(clientList[i].name);
        }
    }
    showCients();
    socket.on('data',function(data){
        for(var i = 0;i<clientList.length;i++){
            if(socket !== clientList[i]){
                clientList[i].write('['+socket.name+']'+data);
            }
        }
    });
    socket.on("close",function(){
        clientList.splice(clientList.indexOf(socket),1);
        showCients();
    });

});

server.listen(8080)
