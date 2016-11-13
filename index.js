var Botkit = require('botkit');
var request = require('request');

var controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: '',
}).startRTM()

controller.hears('hello',['direct_message'], function(bot,message) {
    bot.reply(message, 'Hello yourself.');
});

var reply_with_meaning  = function(bot, message, word) {
    bot.reply(message, word);   
}

controller.hears(['[a-zA-Z]\?'], ['direct_message'], function(bot, message){
    word = message.text
    reply_with_meaning(bot, message, word.slice(0, -1));
});

controller.hears(['[a-zA-Z]\s\?'], ['direct_message'], function(bot, message){
    word = message.text
    reply_with_meaning(bot, message, word.split("")[0])
})
