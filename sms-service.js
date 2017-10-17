var http = require('http');
var express = require('express');
var twilio = require('twilio');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');

var client = require('twilio')(
    'ACc694cec59a35c6b5830571760dc626a6',
    'af0ddb5adb3d8d38d04babd5b03b24db'
);


//to be put into the timer on line 73 or so
setInterval(function () {
    for (var i = 0; i < users.length; i++) {
        console.log(users[i]['number']);
        client.messages.create({
            from: "+19149966800",
            to: users[i]['number'],
            body: 'Hello! Here\'s today\'s tip: \n' + questions[globalDay]['info'] + ' \n Would you like to test your knowledge? Respond with "Yes" to play!'
        }, function (err, message) {
            if (err) console.error(err.message);
        });
    }

    //every 400 seconds
}, 4000);

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/sms', function (req, res) {
    var twilio = require('twilio');
    var twiml = new MessagingResponse();
    var isQuestionOne = false; //this is a flag that gets switched when the quiz is initialized
    var isQuestionTwo = false;
    var isQuestionThree = false;
    var msgBody = req.body.Body;

    if (!isQuestionOne && !isQuestionTwo && !isQuestionThree) {
        if (msgBody.trim().toLowerCase() == 'si' || msgBody.trim().toLowerCase() == 'yes' || msgBody.trim().toLowerCase() == 'start') {
            
        }
    }


    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(twiml.toString());
});

http.createServer(app).listen(3000, function () {
    console.log("Express server listening on port 3000");
});



function queryQuiz(userAnswerAttempt) {
    //does lookup and returns boolean
    if () return false;
    else return true;
}

var dayInMilliseconds = 1000 * 60 * 60 * 24;
var globalDay = 0;



setInterval(function () {
    var lenInfoSet = questions.length;
    if (globalDay == lenInfoSet - 1) globalDay = 0;
    else globalDay++;
}, dayInMilliseconds);

var questions = [
    {
        "questionId": 0,
        "questionName": "Test question Name",
        "info": "Basic information",
        "question": "What is blah blah, basic question?",
        "answer": "Answer to question"
    },
    {
        "questionId": 1,
        "questionName": "Test question Name1",
        "info": "Basic information1",
        "question": "What is blah blah, basic question1?",
        "answer": "Answer to question1"
    },
    {
        "questionId": 2,
        "questionName": "Test question Name2",
        "info": "Basic information2",
        "question": "What is blah blah, basic question2?",
        "answer": "Answer to question2"
    },
]

var users = [
    {
        'name': 'Jon Koller',
        'number': '+19143301533'
    },

    {
        "name": "Bruce Wayne",
        "number": "+19174445555"
    }
	,
    {
        "name": "Arnold Schwartzenager",
        "number": "+12123334444"
    }
	]
