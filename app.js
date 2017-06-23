// Node requirements
const path = require('path');

// Bot setup
const Botmaster = require('botmaster');
const TwitterBot = require('botmaster-twitter-dm');
const twitterSettings = require(path.resolve(__dirname, 'config'));

const botmaster = new Botmaster();
const twitterBot = new TwitterBot(twitterSettings);

botmaster.addBot(twitterBot);


// Own requirements: controllers, messages 
const messages = require(path.resolve(__dirname, 'messages', 'index'));
const getPlacesICanHelp = require(path.resolve(__dirname, 'controllers', 'getPlacesICanHelp'));

let myIncomingMiddlewareController = (bot, update) => {
    if (update.message.text === 'hi' ||
        update.message.text === 'Hi' ||
        update.message.text === 'hello' ||
        update.message.text === 'Hello' ||
        update.message.text === 'yo' ||
        update.message.text === 'Hey' ||
        update.message.text === 'hey') {
        return bot.sendTextCascadeTo(messages.tutorial, update.sender.id);
    } else if (update.message.text.indexOf('Kenya') > -1) {
        getPlacesICanHelp('Kenya')
            .then(message => {
                bot.sendTextCascadeTo(message, update.sender.id)
            })
            .catch(err => {
                bot.update(update, err);
            });
    } else if (update.message.text === 'Thanks' ||
        update.message.text === 'thanks' ||
        update.message.text === 'ta' ||
        update.message.text === 'Thank you' ||
        update.message.text === 'Thank you, very much' ||
        update.message.text === 'thank you very much') {
        return bot.sendTextCascadeTo(messages.thanksReply, update.sender.id);
    } else {
        return bot.sendTextCascadeTo(messages.appologies, update.sender.id);
    }
};

botmaster.use({
    type: 'incoming',
    name: 'My incoming middleware',
    controller: myIncomingMiddlewareController,
});