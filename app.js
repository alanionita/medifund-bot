const path = require('path');
const { makeWatsiRequest } = require(path.resolve(__dirname, 'watsi', 'index'));
const { sortByCountry } = require(path.resolve(__dirname, 'watsi', 'methods'));
const { getRandomInt } = require(path.resolve(__dirname, 'watsi', 'methods'));

const Botmaster = require('botmaster');
const botmaster = new Botmaster();

const TwitterBot = require('botmaster-twitter-dm');
const twitterSettings = require(path.resolve(__dirname, 'config'));
const twitterBot = new TwitterBot(twitterSettings);

botmaster.addBot(twitterBot);

let myIncomingMiddlewareController = (bot, update) => {
    if (update.message.text === 'hi' ||
        update.message.text === 'Hi' ||
        update.message.text === 'hello' ||
        update.message.text === 'Hello' ||
        update.message.text === 'yo' ||
        update.message.text === 'Hey' ||
        update.message.text === 'hey') 
        {
        const tutorial = ['Hey 👋',
            'It\'s nice to meet you',
            'This is a vertical slice for searching for treatments in Kenya',
            'Try it out!',
            'Hint: "I want to fund projects in Kenya"',
        ];

        return bot.sendTextCascadeTo(tutorial, update.sender.id);
    } else if (update.message.text.indexOf('Kenya') > -1) {
        return new Promise((resolve, reject) => {
            if (update.message.text.indexOf('kenya') < -1 || update.message.text.indexOf('Kenya') < -1) return reject('Country was not found');
            return makeWatsiRequest()
                .then((patients) => {
                    const filteredPatients = sortByCountry(patients.profiles, 'Kenya');
                    return filteredPatients;
                })
                .then((filteredPatients) => {
                    if (!filteredPatients) return reject(
                        bot.reply(update, 'Sorry we don\'t have any treatment available in that country')
                    );
                    const firstPatient = filteredPatients.slice(0, 20);
                    let random = getRandomInt(0,20);
                    const kenyaMessage = [
                        'You can contribute to ' + firstPatient[random].name,
                        firstPatient[random].header,
                        firstPatient[random].url
                    ];
                    return resolve(
                        bot.sendTextCascadeTo(kenyaMessage, update.sender.id)
                    );
                });
        });
    } else if (update.message.text === 'Thanks' ||
               update.message.text === 'thanks' ||
               update.message.text === 'ta' ||
               update.message.text === 'Thank you' ||
               update.message.text === 'Thank you, very much' ||
               update.message.text === 'thank you very much' ) {
        return bot.reply(update, 'Oh, I\'m blushing. I\'m glad you liked what you found');
    } else {
        const appologies = ['I\'m sorry about this.',
            'But it seems like I couldn\'t understand your message.',
            'Could you try reformulating it?']
        return bot.sendTextCascadeTo(appologies, update.sender.id);
    }
};

botmaster.use({
    type: 'incoming',
    name: 'My incoming middleware',
    controller: myIncomingMiddlewareController,
});