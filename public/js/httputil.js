// import Socket from "net"

// declare module 'tcphttp'{

// }



class HttpUtil{
    constructor(sock){
        this.sock = sock;
        //this.url = url;
    };

    selfPost(url, hostname, host, ds){
        var requestMessage = "POST " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    selfGet(url, hostname, host, ds){
        //var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1" + "\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    selfWaitGet(url, hostname, host, ds){
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    hpSendData = msg => {
        this.sock.write(msg);
    };
}

module.exports = HttpUtil;