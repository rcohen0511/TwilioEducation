// Twilio Credentials 

 
var client = require('twilio')(
'ACc694cec59a35c6b5830571760dc626a6',
'af0ddb5adb3d8d38d04babd5b03b24db'
);

client.messages.create({
	from: "+19149966800",
	to: "+19143301533",
	body: "Hello from Jonathan Koller CS 643 Fall 2017!"
}, function(err,message){
	if(err) console.error(err.message);
});

/*

var server = http.createServer(function (req, res) {
	console.log(process.env);
	if (req.method.toLowerCase() == 'get') {
		displayAdminPanel(res);
	} else if (req.method.toLowerCase() == 'post') {
		Send_NewUser(req, res);
	}
});

function displayAdminPanel(res) {
	fs.readFile('index.html', function (err, data) {
		res.writeHead(200, {
			'Content-Type': 'text/html',
			'Content-Length': data.length
		});
		res.write(data);
		res.end();
	});
};


function Send_NewUser(req, res) {
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



function If_WantsQuiz(){
    
}

function If_DoesntWantQuiz(){
    
}

server.listen(port);

*/