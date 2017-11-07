# hibp-bot-2


## Deploy
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

 - Hit that button 
 - Change the config variables 
	 1. You'll need to create a Slack app [here](https://api.slack.com/slack-apps)
	 2. Make the following config variables (in key - value format)
		 - clientId - provided by slack
		 - clientSecret - ditto
		 - oauthRedirect - `yourHerokuUrl/oauth`
		 - PORT - 80
 -  Go to`yourHerokuUrl/login` and authorize it.
 -  You'll get something that says it didn't work but it did (we just haven't added a handler to acknowledge that it worked)
 - Your app should work!
	 - Try DMing the bot any of the following:
		 - Pwned 
		 - Pwned `email`
		 - allPwned
		 - help
 
## Known Bugs
 - Each time you redeploy to Heroku, you'll have to go and login again
 - The app will fall asleep every day at 1 AM Gold Coast Time (hi Troy!)
 - It's unknown what sleeping will do to Heroku deploy - will update when we know
 - It's very unsteady - if you get an error, Heroku will probably just restart the app 

## License 
MIT.

## Anything else?
Open an issue!