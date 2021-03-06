if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: `./.${process.env.NODE_ENV}.env`
  });
}

// Node requirements
const path = require('path');

// Bot setup
const Botmaster = require('botmaster');
const TwitterBot = require('botmaster-twitter-dm');
const twitterSettings = {
  credentials: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_SECRET
  }
};

const botmasterSettings = {
  port: process.env.PORT
};
const botmaster = new Botmaster(botmasterSettings);
const twitterBot = new TwitterBot(twitterSettings);

botmaster.addBot(twitterBot);

// Own requirements: controllers, messages
const messages = require(path.resolve(__dirname, 'messages', 'index'));
const getPlacesICanHelp = require(path.resolve(
  __dirname,
  'controllers',
  'getPlacesICanHelp'
));

let myIncomingMiddlewareController = (bot, update) => {
  if (
    update.message.text === 'hi' ||
    update.message.text === 'Hi' ||
    update.message.text === 'hello' ||
    update.message.text === 'Hello' ||
    update.message.text === 'yo' ||
    update.message.text === 'Hey' ||
    update.message.text === 'hey'
  ) {
    bot.sendTextCascadeTo(messages.tutorial, update.sender.id);
  } else if (update.message.text.indexOf('Kenya') > -1) {
    getPlacesICanHelp('Kenya')
      .then(message => {
        bot.sendTextCascadeTo(message, update.sender.id);
      })
      .catch(err => {
        bot.update(update, err);
      });
  } else if (
    update.message.text === 'Thanks' ||
    update.message.text === 'thanks' ||
    update.message.text === 'ta' ||
    update.message.text === 'Thank you' ||
    update.message.text === 'Thank you, very much' ||
    update.message.text === 'thank you very much'
  ) {
    return bot.sendTextCascadeTo(messages.thanksReply, update.sender.id);
  } else if (update.message.text === 'What are you?') {
    return bot.sendTextCascadeTo(messages.what, update.sender.id);
  } else if (update.message.text === 'How does it work?') {
    return bot.sendTextCascadeTo(messages.how, update.sender.id);
  } else if (update.message.text === 'What is your mission?') {
    return bot.sendTextCascadeTo(messages.mission, update.sender.id);
  } else if (update.message.text === 'What now?') {
    return bot.sendTextCascadeTo(messages.whatnow, update.sender.id);
  } else if (update.message.text === 'commands') {
    return bot.sendTextCascadeTo(messages.commands, update.sender.id);
  } else if (update.message.text === 'High five') {
    return bot.reply(
      update,
      'https://giphy.com/gifs/tom-cruise-top-gun-maverick-wrzf9P70YWLJK/fullscreen'
    );
  } else {
    return bot.sendTextCascadeTo(messages.appologies, update.sender.id);
  }
};

botmaster.use({
  type: 'incoming',
  name: 'My incoming middleware',
  controller: myIncomingMiddlewareController
});
