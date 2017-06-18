const request = require('request');
const URL = 'https://watsi.org/fund-treatments.json';

exports.call = request.get(URL, {
    json: true
}, function (err, res, patients) {
    return new Promise((resolve, reject) => {
        if (err) return reject(err);
        return resolve(patients);
    });
        // .then((patients) => {
        //     const filteredByCountry = sortByCountry(patients, 'Kenya');
        //     return filteredByCountry;
        // })
        // .then((filteredByCountry) => {
        //     console.log(showOnlyTheFirstXEntries(filteredByCountry, 'sdhjh'));
        // });
});


function sortByCountry(patients, targetCountry) {
    return patients.profiles.filter((patient) => {
        if (patient.country === targetCountry) return patient;
    });
}

function showOnlyTheFirstXEntries(patients, number) {
    if (number && +number) return patients.slice(0, number);
}