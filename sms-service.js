var http = require('http');

var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var port = process.env.PORT || 3000;

var express = require('express');
var twilio = require('twilio');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
var bodyParser = require('body-parser');

var questions = [
    {
        "questionId": 0,
        "questionName": "Test question Name",
        "info": "Do you wash your hands before you eat? You should! Otherwise you lend yourself vulnerable to nasty bacteria found on the street.",
        "question": "How many minutes should you wash your hands?",
        "choices": ['1. 2 minutes', '2. 1 minute', '3. 4 minutes'],
        "answer": 1
    },
    {
        "questionId": 1,
        "questionName": "Test question Name1",
        "info": "Basic information1",
        "question": "What is blah blah, basic question1?",
        "choices": [1, 2, 3],
        "answer": 2
    },
    {
        "questionId": 2,
        "questionName": "Test question Name2",
        "info": "Basic information2",
        "question": "What is blah blah, basic question2?",
        "choices": [1, 2, 3],
        "answer": 3
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

var client = require('twilio')(
        // process.env.TWILIO_ACCOUNT_SID,
        // process.env.TWILIO_AUTH_TOKEN
        'ACc694cec59a35c6b5830571760dc626a6',
        'af0ddb5adb3d8d38d04babd5b03b24db'
);

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

var values = [];

function formSubmission(req, res) {
    var fields = [];
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

        questions[0] = {
            "questionId": 0,
            "questionName": "Test question Name",
            "info": values[0],
            "question": values[1],
            "choices": ['1.' + values[1], '2.' + values[2], '3.' + values[3]],
            "answer": 1
        }
        console.log(questions);
    });
    form.parse(req);
}

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

var formSubmitted = false;
var acceptedQuiz = false;
var isQuestionOne = false; //this is a flag that gets switched when the quiz is initialized

app.get('/', function (req, res) {
    displayForm(res);
});

app.get('/sms', function (req, res) {
    displayForm(res);
});

app.post('/', function (req, res) {
    formSubmission(req, res);
    formSubmitted = true;

    //setInterval
    setTimeout(function () {
        for (var i = 0; i < users.length; i++) {
            client.messages.create({
                // from: process.env.TWILIO_PHONE_NUMBER,
                from: '+19149966800',
                to: values[i + 4],
                body: 'Hello! Here\'s today\'s tip: \n' + questions[globalDay]['info'] + ' \n Would you like to test your knowledge? Respond with "Yes" to answer a quiz question!'
            }, function (err, message) {
                if (err) console.error(err.message);
            });
        }
    }, 1000);
    //dayInMilliseconds		
})

app.post('/sms', function (req, res) {
    var twilio = require('twilio');
    var twiml = new MessagingResponse();

    var msgBody = req.body.Body;

    if (!acceptedQuiz) { //if hasnt accepted the quiz attempt
        if (msgBody.trim().toLowerCase() == 'yes') {
            acceptedQuiz = true;
            isQuestionOne = true;


            var messageString = 'Here is your question! \nIs A A?\n\nChoices:\n';
/* yikes  - needs to reference a backend to query for all numbers in data base*/
            for (var i = 0; i < 3; i++) {
                messageString += '\n' + questions[globalDay]['choices'][i];
            }
            twiml.message(messageString);
        } else if (msgBody.trim().toLowerCase() == 'no') {
            twiml.message('Fair enough!');
        } else {
            twiml.message('Please check your spelling or re-type \'Yes\' to take the quiz!');
        }
    } else if (acceptedQuiz && isQuestionOne) {
        if ((globalDay == 0 && msgBody == 1) || (globalDay == 1 && msgBody == 1) || (globalDay == 2 && msgBody == 3)) {
            isQuestionOne = false;
            twiml.message('Correct! Great job! Stay tuned tomorrow for more!');
        } else if (parseInt(msgBody) > 3 || parseInt(msgBody) < 1 || isNaN(msgBody)) {
            twiml.message('Please check your response! Choose 1, 2, or 3!');
        } else {
            isQuestionOne = false;
            twiml.message('I\'m sorry, but that\'s incorrect. Try again tomorrow!');
        }
    }
    
    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(twiml.toString());
});

http.createServer(app).listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port 3000");
});

var dayInMilliseconds = 1000 * 60 * 60 * 24;
var globalDay = 0;


/*
setInterval(function () {
	var lenInfoSet = questions.length;
	if (globalDay == lenInfoSet) globalDay = 1;
	else globalDay++;
}, dayInMilliseconds);
*/