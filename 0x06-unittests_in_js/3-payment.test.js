// 3-payment.test.js
const sinon = require('sinon');
const { expect } = require('chai');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('should call Utils.calculateNumber with the correct arguments', () => {
    // Create a spy for the calculateNumber function
    const spy = sinon.spy(Utils, 'calculateNumber');

    // Call the function being tested
    sendPaymentRequestToApi(100, 20);

    // Check that the spy was called with the expected arguments
    expect(spy.calledOnceWith('SUM', 100, 20)).to.be.true;

    // Restore the spy to avoid side effects in other tests
    spy.restore();
  });
});
