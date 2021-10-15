var net = require('net');

process.stdin.resume();

process.stdin.setEncoding('utf8');

var client = net.connect({port:8080},function(){
    console.log("本机登陆到聊天室");
    process.stdin.on('data',function(data){
        client.write(data);
    });
    client.on("data",function(data){
        console.log(data.toString());
        client.write("123");
    });

    client.on("end",function(){
        console.log("退出聊天室");
        process.exit();
    });
    client.on('"error',function(){
        console.log("出现异常");
        process.exit()
    });
});
