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

    /**
     *  "POST /message?peer_id=%i&to=%i HTTP/1.0\r\n"
      "Content-Length: %i\r\n"
      "Content-Type: text/plain\r\n"
      "\r\n",
     * @param {*} url 
     * @param {*} hostname 
     * @param {*} host 
     * @param {*} ds 
     */
    selfPostSignal(url, hostid, peerid, msg){
        var requestMessage = "POST " + url + '?peer_id=' + hostid + '&to=' + peerid + " HTTP/1.1\r\n"
        + "Content-Length: "+ msg.length +"\r\n"
        + "Content-Type: text/plain\r\n"
        + "\r\n"
        + msg;
        console.log(requestMessage);
        this.sock.write(requestMessage);
    }

    selfGet(url, hostname, host, ds){
        //var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\nhost:" + host + "\r\n\r\n";
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1" + "\r\n\r\n";
        console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    selfWaitGet(url, hostname, host, ds){
        var requestMessage = "GET " + url + '?' + hostname + " HTTP/1.1\r\n\r\n";
        //console.log(requestMessage);
        this.sock.write(requestMessage);
    };

    hpSendData = msg => {
        this.sock.write(msg);
    };
}

module.exports = HttpUtil;