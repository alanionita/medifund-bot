const request = require('request');
const path = require('path');

const URL = 'https://watsi.org/fund-treatments.json';
const { sortByCountry, showOnlyTheFirstXEntries } = require(path.resolve(__dirname, 'methods'));

exports.call = request.get(URL, {
    json: true
}, function (err, res, patients) {
    return new Promise((resolve, reject) => {
        if (err) return reject(err);
        return resolve(patients);
    })
        .then((patients) => {
            const filteredByCountry = sortByCountry(patients.profiles, 'Kenya');
            return filteredByCountry;
        })
        .then((filteredByCountry) => {
            console.log(showOnlyTheFirstXEntries(filteredByCountry, 1));
        });
});