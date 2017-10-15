var questions = {
  "questionId" : 0,
  "questionName" : "Test question Name",
  "info" : "Basic information",
  "question" : "What is blah blah, basic question?"
}

var client;
var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var port = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
	console.log(questions)
	console.log(process.env);
	if (req.method.toLowerCase() == 'get') {
		displayForm(res);
	} else if (req.method.toLowerCase() == 'post') {
		formSubmission(req, res);
	}
});

function displayForm(res) {
	fs.readFile('index.html', function (err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': data.length
		});
		res.write(data);
		res.end();
	});
};


function formSubmission(req, res) {
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
		client = require('twilio')(
			values[1], values[2]
		);
        client.messages.create({
            from: "+1"+values[3],
            to: "+1"+values[4],
            body: "Hello from " + values[0] + " CS 643 Fall 2017!"
        }, function (err, message) {
            if (err) console.error(err.message);
        });
	});
	form.parse(req);
}
server.listen(port);
