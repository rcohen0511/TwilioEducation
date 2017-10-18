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
//setInterval
setTimeout(function () {
    for (var i = 0; i < users.length; i++) {
        client.messages.create({
            from: "+19149966800",
            to: users[i]['number'],
            body: 'Hello! Here\'s today\'s tip: \n' + questions[globalDay]['info'] + ' \n Would you like to test your knowledge? Respond with "Yes" to answer a quiz question!'
        }, function (err, message) {
            if (err) console.error(err.message);
        });
    }
}, 1000);
//dayInMilliseconds

var app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
var acceptedQuiz = false;
var isQuestionOne = false; //this is a flag that gets switched when the quiz is initialized
/*
//for future implementation, in which each day has 3 questions
var isQuestionTwo = false;
var isQuestionThree = false;
*/
app.post('/sms', function (req, res) {
    var twilio = require('twilio');
    var twiml = new MessagingResponse();

    var msgBody = req.body.Body;
    
    if (!acceptedQuiz) { //if hasnt accepted the quiz attempt
        if (msgBody.trim().toLowerCase() == 'yes')  {
            acceptedQuiz = true;
            var messageString = 'Here is your question! \n'+ questions[globalDay]['question'] + '\n Choices:';
            for(var i = 0; i < 3; i++){
                messageString += '\n' + questions[globalDay]['choices'][i];
            }
            twiml.message(messageString);
            isQuestionOne = true;            
        }
        else if(msgBody.trim().toLowerCase() == 'no'){
            twiml.message('Fair enough!');
        }
        else{
            twiml.message('Please check your spelling or re-type \'Yes\' to take the quiz!');
        }
    }
    else if(isQuestionOne && msgBody == 1 || msgBody == 2 || msgBody == 3){
        if((globalDay == 0 && msgBody == 1) || (globalDay == 1 && msgBody == 1) || (globalDay == 2 && msgBody == 3)){            
           twiml.message('Correct! Great job!');
        }
        else if(parseInt(msgBody) > 3 || parseInt(msgBody) < 1 || isNaN(msgBody)){
            twiml.message('Please check your response! Choose 1, 2, or 3!');            
        }
        else twiml.message('I\'m sorry, but that\'s incorrect. Try again tomorrow!');                
    }

    /* 
    else { //quiz is begun
        if (isQuestionOne) {
            displayQuestion(twiml);
            //display question and then check again for boolean flag
            switch (globalDay) {
                case 0:
                case 1:
                case 2:

            }
        } else {
            twiml.message('Wait \'til tomorrow for the next question!');
        }
*/
    /* 
       
//--Implementation for multiple questions per day to come --
                    //This will be added under the initial boolean check of acceptedQuiz
        //at this point, isQuestionOne is true, so we are checking for booleans one quesiton ahead of where we are
        if(!isQuestionTwo){
            displayQuestion(questions)
            
        }
        else if(!isQuestionThree){
            
        }
        else{
            
        }
        */
    //    }



    res.writeHead(200, {
        'Content-Type': 'text/xml'
    });
    res.end(twiml.toString());
});

http.createServer(app).listen(3000, function () {
    console.log("Express server listening on port 3000");
});


function displayQuestion(twiml_msg_res) {
    twiml_msg_res.message(questions[globalDay]['question']);
    //for now, it's one quesion per day
    //    queryQuiz()
}

function queryQuiz(userAnswerAttempt) {
    //does lookup and returns boolean about if question is right or wrong
}

var dayInMilliseconds = 1000 * 60 * 60 * 24;
var globalDay = 1;



setInterval(function () {
    var lenInfoSet = questions.length;
    if (globalDay == lenInfoSet) globalDay = 1;
    else globalDay++;
}, dayInMilliseconds);

var questions = [
    {
        "questionId": 0,
        "questionName": "Test question Name",
        "info": "Basic information",
        "question": "What is blah blah, basic question?",
        "choices":[1,2,3],
        "answer": 1
    },
    {
        "questionId": 1,
        "questionName": "Test question Name1",
        "info": "Basic information1",
        "question": "What is blah blah, basic question1?",
        "choices":[1,2,3],
        "answer": 2
    },
    {
        "questionId": 2,
        "questionName": "Test question Name2",
        "info": "Basic information2",
        "question": "What is blah blah, basic question2?",
        "choices":[1,2,3],
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