var http = require('http');
var express = require('express');
var twilio = require('twilio');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');

var client = require('twilio')(
	'ACc694cec59a35c6b5830571760dc626a6',
	'af0ddb5adb3d8d38d04babd5b03b24db'
);

setInterval(function () {
	client.messages.create({
		from: "+19149966800",
		to: "+19143301533",
		body: "Hello from Jonathan Koller CS 643 Fall 2017!"
	}, function (err, message) {
		if (err) console.error(err.message);
	});
	//every 400 seconds
}, 400000);

var app = express();

app.use(bodyParser.urlencoded({
	extended: false
}));

app.post('/sms', function (req, res) {
	var twilio = require('twilio');
	var twiml = new MessagingResponse();

	var msgBody = req.body.Body;
	console.log(msgBody == 'hey');
	//	if()

	twiml.message('The Robots are coming! Head for the hills!');
	res.writeHead(200, {
		'Content-Type': 'text/xml'
	});
	res.end(twiml.toString());
});

http.createServer(app).listen(3000, function () {
	console.log("Express server listening on port 3000");
});



function Send_DailyMessagePrompt() {
	/* 
	new message every day
	listens for keyword to start quiz
	calls to DB for quiz info
	*/
}


// extra syntax for messages just in case:

//	res.send(`
//	<Response>
//		<Message>
//				Hello ${msgFrom}. You said: ${msgBody}
//		</Message>
//	</Response>
//`);

//	var msgFrom = req.body.From;
//	console.log(msgFrom);
