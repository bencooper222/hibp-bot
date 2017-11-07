const Botkit = require('botkit');



var controller = Botkit.slackbot({
    json_file_store: './data/',
    debug: false,
    stats_optout: true
});

if(controller.debug===true){
  const env = require('node-env-file');
  env(__dirname + '/.env');
}


if (!process.env.clientId || !process.env.clientSecret || !process.env.PORT) {
  console.log('Error: Specify clientId clientSecret and PORT in environment');
}

console.log(process.env.clientId);

controller.configureSlackApp({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret,
    redirectUri: process.env.oauthRedirect,
    scopes: ['bot']
});

controller.setupWebserver(process.env.PORT, function(err, webserver) {
    controller.createWebhookEndpoints(controller.webserver);

    controller.createOauthEndpoints(controller.webserver, function(err, req, res) {
        if (err) {
            res.status(500).send('ERROR: ' + err);
        } else {
            res.send('Success!');
        }
    });
});


// stop multiple connections
var _bots = {};

function trackBot(bot) {
    _bots[bot.config.token] = bot;
}

controller.on('create_bot', function(bot, config) {

    if (_bots[bot.config.token]) {
        // already online! do nothing.
    } else {
        bot.startRTM(function(err) {

            if (!err) {
                trackBot(bot);
            }

        });
    }

});

controller.storage.teams.all(function(err, teams) {

    if (err) {
        throw new Error(err);
    }

    // connect all teams with bots up to slack!
    for (var t in teams) {
        if (teams[t].bot) {
            controller.spawn(teams[t]).startRTM(function(err, bot) {
                if (err) {
                    console.log('Error connecting bot to Slack:', err);
                } else {
                    trackBot(bot);
                }
            });
        }
    }

});
/*

controller.hears('.*', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    console.log('Received a message', message);

    bot.reply(message, 'he');
});

*/
const pwn = require("./pwn.js");
pwn(controller);





/*
controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'],
'direct_message,direct_mention,mention', function(bot, message) {

    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());

    bot.reply(message,
        ':robot_face: I am a bot named <@' + bot.identity.name +
         '>. I have been running for ' + uptime + ' on ' + hostname + '.');

});
*/