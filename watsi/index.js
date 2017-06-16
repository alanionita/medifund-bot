const request = require('request');
const URL = 'https://watsi.org/fund-treatments.json';

request.get(URL, {
  json: true
}, function(err, res, patients) {
  console.log('Patients!', patients);
});