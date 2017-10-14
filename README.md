# TwilioSend

To run on localhost, type:
	    
	                        node sms.js

Be sure to swap the environment variables on lines 48 and 49 if you do not have environment variables with these names:

	process.env.TWILIO_PHONE_NUMBER
	process.env.CELL_PHONE_NUMBER

The same goes for these at the top of sms.js: 

	process.env.TWILIO_ACCOUNT_SID
	process.env.TWILIO_AUTH_TOKEN
	
You should be able to hard-code the info in the outermost scope of sms.js, though, and be good to go. 