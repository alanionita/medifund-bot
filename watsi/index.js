const request = require('request');

exports.makeWatsiRequest = () => {
    return new Promise((resolve, reject) => {
        request.get('https://watsi.org/fund-treatments.json', {
            json: true
        }, function (err, res, patients) {
            if (err) return reject(err);
            return resolve(patients);
        });
    });
}; 
