var Botkit = require('botkit');
var request = require('request');
var config = require('./config')

var controller = Botkit.slackbot({
    debug: false
});
controller.spawn({
    token: config.slack.app_key,
}).startRTM()

controller.hears('hello',['direct_message'], function(bot,message) {
    bot.reply(message, 'Hello yourself.');
});

var reply_with_meaning  = function(bot, message, word) {
    
    request( {
        url: 'https://od-api.oxforddictionaries.com/api/v1/entries/en/'+word,
        headers: {
            app_id: config.oxford.app_id,
            app_key: config.oxford.app_key,
            accept: 'application/json'
        }
    }, function(err, response, body){
        if (!err && response.statusCode == 200){
            bot.reply(message, body)
        }
        else{
            console.log(message, "SHIT happened!!")
        }
    })
}

controller.hears(['[a-zA-Z][?]'], ['direct_message'], function(bot, message){
    word = message.text
    reply_with_meaning(bot, message, word.slice(0, -1));
});

controller.hears(['[a-zA-Z]\s[?]'], ['direct_message'], function(bot, message){
    word = message.text
    reply_with_meaning(bot, message, word.split("")[0])
})
