const path = require('path');

const { makeWatsiRequest } = require(path.resolve(__dirname, '..', 'watsi', 'index'));
const { sortByCountry, getRandomInt } = require(path.resolve(__dirname, '..', 'watsi', 'methods'));
const messages = require(path.resolve(__dirname, '..', 'messages', 'index'));

function getPlacesICanHelp(place) {
    return new Promise((resolve, reject) => {
        return makeWatsiRequest()
            .then((patients) => {
                return sortByCountry(patients.profiles, place);
            })
            .then((filteredPatients) => {
                if (!filteredPatients) reject(messages.sorryCountry);
                const firstPatient = filteredPatients.slice(0, 20);
                let random = getRandomInt(0, 20);
                const kenyaMessage = [
                    'You can contribute to ' + firstPatient[random].name,
                    firstPatient[random].header,
                    firstPatient[random].url
                ];
                return resolve(
                    kenyaMessage
                );
            })
            .catch(reject);
    });
}

module.exports = getPlacesICanHelp;