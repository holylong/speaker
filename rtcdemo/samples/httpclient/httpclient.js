var request = require('request');

var url = "http://172.19.0.138:8888/sign_in"

request('http://172.19.0.138:8888/sign_in?linux', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the baidu homepage.
  }
})

requestData = {
    "peer":"123"
}

// request({
//     url: url,
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "application/json",
//     },
//     body: JSON.stringify(requestData)
// }, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body)
//     }
// });

// request.post({url:'http://service.com/upload', form:{key:'value'}}, function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//     }
// })

// var formData = {
//     // Pass a simple key-value pair
//     my_field: 'my_value',
//     // Pass data via Buffers
//     my_buffer: new Buffer([1, 2, 3]),
//     // Pass data via Streams
//     my_file: fs.createReadStream(__dirname + '/unicycle.jpg'),
// };
// request.post({url:'http://service.com/upload', formData: formData}, function (error, response, body) {  
//     if (!error && response.statusCode == 200) {
//     }
// })