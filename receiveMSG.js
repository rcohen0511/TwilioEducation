/*

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({
    extended:false
}));

app.post('/message',function(req,res){
    console.log(req.body);
    var msgFrom = req.body.From;
    var msgBody = req.body.Body;
    
    res.send(`
    <Response>
        <Message>
            Hello ${msgFrom}. You said: ${msgBody}
        </Message>
    </Response>

`
             //TWIML
    )
})

app.listen(3000 || process.env.PORT) ;
    
*/

var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.post('/sms/', function(req,res){
    var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
    twiml.message("OUTBOUT MESSAGE");
    res.writeHead(200,{'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

http.createServer(app).listen(3000 || process.env.PORT, function(){
    console.log('Listening on 3000');
})

//ngrok http 3000
//get url to A Message Comes In w/ /sms to end of url