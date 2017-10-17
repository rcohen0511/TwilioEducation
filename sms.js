<<<<<<< HEAD
var questions = {
  "questionId" : 0,
  "questionName" : "Test question Name",
  "info" : "Basic information",
  "question" : "What is blah blah, basic question?"
}


=======
var questions =[
 {"questionId" : 0,
  "questionName" : "Test question Name",
  "info" : "Basic information",
  "question" : "What is blah blah, basic question?",
	"answer" : "Answer to question"},
	{"questionId" : 1,
	 "questionName" : "Test question Name1",
	 "info" : "Basic information1",
	 "question" : "What is blah blah, basic question1?",
 	 "answer" : "Answer to question1"},
	 {"questionId" : 2,
 	 "questionName" : "Test question Name2",
 	 "info" : "Basic information2",
 	 "question" : "What is blah blah, basic question2?",
  	 "answer" : "Answer to question2"},
]
var users = [
		{"name":"Bruce Wayne",
		"number": "9174445555"}
	,
		{"name":"Arnold Schwartzenager",
		"number" : "2123334444"}
	]

var globalDay = 0;
>>>>>>> mocktest
var client;
var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var port = process.env.PORT || 3000;

var server = http.createServer(function (req, res) {
<<<<<<< HEAD
	console.log(process.env);
	console.log(questions);
=======
	// console.log(questions.questionId)
	// console.log(process.env);
	startApp();
>>>>>>> mocktest
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
<<<<<<< HEAD
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

function getQuestion(){

	console.log(questions);

}

=======

	});
	form.parse(req);
}
function sendText(from, to, message){
	client = require('twilio')(
		values[1], values[2]
	);
			client.messages.create({
					from: from,
					to: to,
					body: message
			}, function (err, message) {
					if (err) console.error(err.message);
			});
}

function startApp(){


	// Change time interval to daily when you are done testing
	setInterval(function(){ dailyTasks(globalDay) },2000);
}

function dailyTasks(day){
	//Manages globalDay variable, to keep looping through questions array
	//I put this first so we can use the globalDay variable to look up other info
	//pertaining to that day, like quiz Questions/Answers
	var lenInfoSet = questions.length;
	if (day == lenInfoSet-1){
		globalDay = 0;
	} else {
		globalDay = day+1
	}

	//Daily Logic
	var dailyInfo = questions[day].info
	var arrayLength = users.length;

	for (var i = 0; i < arrayLength; i++) {
    console.log("Send daily info message to user: "+users[i].name+" on phone number: "+users[i].number);
		console.log("Daily info message: "+dailyInfo)
	}


}

function sendTodaysQuiz(day,number){
	//We need to get the phone number from the listener, not sure how this works
	var dailyQuizQuestion = questions[day].question
	console.log(dailyQuizQuestion)
}

function checkAnswer(day, answer){
	//Answer should also come from the listener, I think we should have a seperate
	//function like this for each action that can happen, and one response function
	// that will call these based on the keyword sent by the user
	var correctAns = questions[day].answer
	if(correctAns == answer){
		console.log("Send congrats text saying the answer was right (tally score?)")
	} else{
		console.log("Send text that the answer was wrong and right answer: "+correctAns)
	}
}
>>>>>>> mocktest

server.listen(port);
