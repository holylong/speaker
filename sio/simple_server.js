//http server
const server = require('http').createServer();
const io = require('socket.io')(server);
io.on('connection', client=>{
    console.log(client.id + " connect")
    client.on('event', data=>{console.log(data)});
    client.on('disconnect', ()=>{console.log(client.handshake.address + ' disconnect')});
});

server.listen(3033)