var fs = require('fs');
var formidable = require('formidable');
var http = require('http');
var port = process.env.PORT || 3000;
var util = require('util');
var express = require('express');
var MessagingResponse = require('twilio').twiml.MessagingResponse; 

var app = express();

var client = require('twilio')(
    'ACc694cec59a35c6b5830571760dc626a6',
    'af0ddb5adb3d8d38d04babd5b03b24db'
);

app.post('/sms', function(req,res){
    var twiml = new MessagingResponse();
    
    twiml.message('Hey man');
    
    res.writeHead(200, {'Content-Type':'text/xml'});
    res.end(twiml.toString());
});


/*
function sendMessage() {
    client.messages.create({
        from: "+19149966800",
        to: "+19143301533",
        body: "Hello from Jonathan Koller CS 643 Fall 2017!"
    }, function (err, message) {
        if (err) console.error(err.message);
    });
}

function submitForm(req, res) {
    var fields = [];
    var values = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        fields[field] = value;
        values.push(value);
    });

    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.end(util.inspect({
            fields: fields
        }));

        sendMessage();

    });
    form.parse(req);
}

function displayForm(res) {
	fs.readFile('form.html', function (err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': data.length
		});
		res.write(data);
		res.end();
	});
};
*/

http.createServer(app).listen(port, function(){
    console.log('Express listening on 3000');
})
//
//var server = http.createServer(function (req, res) {
//    console.log(process.env);
//    if (req.method.toLowerCase() == 'get') {
//        displayForm(res);
//    } else if (req.method.toLowerCase() == 'post') {
//        submitForm(req, res);
//    }
//});
//server.listen(port);