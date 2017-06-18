const { expect } = require('chai');
const path = require('path');

const _ = require('underscore');

const { sortByCountry } = require(path.resolve(__dirname, '..', 'watsi', 'methods'));

describe('watsi methods', function () {
    'use strict';
    describe('sortByCountry', function () {
        it('is a function', function () {
            expect(sortByCountry).to.be.a('function');
        });
        it('takes two params: patientsArr, targetCountry', function () {
            expect(sortByCountry.length).to.equal(2);
        });
        it('patientsArr must be an array', function () {
            let patientsArr = 'string';
            let targetCountry = 'Kenya';
            expect(sortByCountry(patientsArr, targetCountry)).to.be.undefined;
        });
        it('targetCountry must be a string', function () {
            let patientsArr = [{
                token: 'd8cc745fbe76',
                name: 'Whitney',
                header: 'Whitney is a newborn baby from Kenya who needs $1,097 to fund spina bifida closure surgery.',
                age_years: null,
                age_months: 0,
                partner_name: 'African Mission Healthcare Foundation',
                country: 'Kenya',
                url: 'https://watsi.org/profile/d8cc745fbe76-whitney',
                photo_url: 'https://d3w52z135jkm97.cloudfront.net/uploads/profile/photo/14276/profile_638x479_e6b84222-0ab1-4b1-8-8399-980bdb8f4633.JPG',
                percent_funded: 0.0455788514129444,
                target_amount: 109700,
                amount_remaining: 104700,
                amount_raised: 5000,
                number_of_donors: 1
            }];
            let targetCountry = 0;
            expect(sortByCountry(patientsArr, targetCountry)).to.be.undefined;
        });
        it('patientsArr must contain only objects', function () {
            let patientsArr = [{
                token: 'd8cc745fbe76',
                name: 'Whitney',
                header: 'Whitney is a newborn baby from Kenya who needs $1,097 to fund spina bifida closure surgery.',
            }, {
                age_years: null,
                age_months: 0,
                partner_name: 'African Mission Healthcare Foundation',
                country: 'Kenya',
                url: 'https://watsi.org/profile/d8cc745fbe76-whitney',
                photo_url: 'https://d3w52z135jkm97.cloudfront.net/uploads/profile/photo/14276/profile_638x479_e6b84222-0ab1-4b1-8-8399-980bdb8f4633.JPG',
                percent_funded: 0.0455788514129444,
            }, {
                target_amount: 109700,
                amount_remaining: 104700,
                amount_raised: 5000,
                number_of_donors: 1
            }];
            let targetCountry = 'Kenya';
            expect(sortByCountry(patientsArr, targetCountry)).to.be.undefined;
        });
    });
});
