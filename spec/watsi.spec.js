const { expect } = require('chai');
const path = require('path');
const watsi = require(path.resolve(__dirname, '..', 'watsi', 'index'));

describe('watsi.call', function () {
    'use strict';
    it('is an object', function () {
        expect(typeof watsi.call).to.equal('object');
    });
});
