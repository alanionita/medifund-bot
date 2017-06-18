
const Botmaster = require('botmaster');
const botmaster = new Botmaster();

const TwitterBot = require('botmaster-twitter-dm');
const twitterSettings = {
    credentials: {
        consumerKey: '9mbs0PQRvUYvmo2usplapHDZZ',
        consumerSecret: 'lEcNn0uJ6DqBG3tTCnj5PIjg96aUdqa2ODTO7XTJdOW3lD8j2n',
        accessToken: '875752057252302849-299VRXlTzD7EitNYcCqBfTWcLiQAbQh',
        accessTokenSecret: 'xH1KY8S2BM1miabJuTtJzAuEn950xh31UnmHOLk6qP50P'
    }
};
const twitterBot = new TwitterBot(twitterSettings);

botmaster.addBot(twitterBot);

let myIncomingMiddlewareController = (bot, update) => {
    if (update.message.text === 'hi' ||
        update.message.text === 'Hi' ||
        update.message.text === 'hello' ||
        update.message.text === 'Hello') {
        return bot.reply(update, 'well hi right back at you');
    } else if (update.message.text.indexOf('kenya') > -1) {
        return new Promise((resolve, reject) => {
            if (update.message.text.indexOf('kenya') < -1) return reject('Country was not found');
            return resolve(
                bot.sendTextMessageTo('It is currently sunny in Kenya', update.sender.id)
            );
    });
} else {
        const messages = ['I\'m sorry about this.',
    'But it seems like I couldn\'t understand your message.',
    'Could you try reformulating it?']
        return bot.sendTextCascadeTo(messages, update.sender.id)
    }
};

botmaster.use({
    type: 'incoming',
    name: 'My incoming middleware',
    controller: myIncomingMiddlewareController,
});