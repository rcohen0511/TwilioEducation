/*
var http = require('http');
var express = require('express');
var MessagingResponse = require('twilio').twiml.MessagingResponse;

var app = express();

app.post('/sms',function(req,res){
    var twiml = new MessagingResponse();
    twiml.message('Buenos dias! El tiempo es ahora a eschuchar!');
    res.writeHead(200, {'Content-Type':'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(3000, ()=>{});


*/
var http = require('http');
var express = require('express');
var twilio = require('twilio');
var MessagingResponse = require('twilio').twiml.MessagingResponse;

var app = express();

app.post('/sms', function(req, res) {
  var twilio = require('twilio');
  var twiml = new MessagingResponse();
  twiml.message('The Robots are coming! Head for the hills!');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
});

http.createServer(app).listen(3000, function () {
  console.log("Express server listening on port 3000");
});


function Send_DailyMessagePrompt(){
    /* 
    new message every day
    listens for keyword to start quiz
    calls to DB for quiz info
    */
}