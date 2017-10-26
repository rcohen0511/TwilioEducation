# TwilioSend

To run on localhost, type:
	    
	                        node sms.js

Be sure to swap the environment variables on line 125 if you do not have environment variables with these names:

	process.env.TWILIO_PHONE_NUMBER
	process.env.CELL_PHONE_NUMBER

The same goes for these at line 56-59

	process.env.TWILIO_ACCOUNT_SID
	process.env.TWILIO_AUTH_TOKEN
	
You should be able to hard-code the info in the outermost scope of sms.js, though, and be good to go. 


# Needed Fixes
1. Phone number input is hard-coded to 3, so successive server calls is not possible
2. This is not deployable on Heroku for some reason - need to do some research on Web Hooks
3. Many other code nightmares await because it's a hack 'n slash job of a script...
4. Stream of data is not linear - because the forms are not in the same order as the original process...

{ fields: 
   [ Tip: 'A is A',
     Answer: 'Yes',
     choice1: 'No',
     choice2: 'Maybe',
     Number: '' ] 
}

Should be

{fields:
    [Tip: 'A is A',
    Question: 'Is A A?',
    Answer: 'Yes',
    choice1: 'No',
    choice2: 'Maybe',
    
    ...could be an error due to the fact that we are adding numbers through the form and it's awkwardly hardcoded to max out at 3 input per server session

    ]
}