'use strict';

var WsServer = require('./wsserver')

let URL = "/hexrtc";
var myserver = new WsServer(6655, URL);

myserver.selfInitServer();