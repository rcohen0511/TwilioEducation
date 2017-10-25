var client = require('twilio')(
//    process.env.TWILIO_ACCOUNT_SID,
//    process.env.TWILIO_AUTH_TOKEN
    'ACc694cec59a35c6b5830571760dc626a6',
    'af0ddb5adb3d8d38d04babd5b03b24db'
);

client.messages.create({
    from: "+19149966800",
    to: "+19143301533",
    body: "Hello from Jonathan Koller CS 643 Fall 2017!"
}, function (err, message) {
    if (err) console.error(err.message);
});
