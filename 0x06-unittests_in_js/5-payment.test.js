// 5-payment.test.js
const chai = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./5-payment');

const { expect } = chai;

describe('sendPaymentRequestToApi', () => {
  let consoleSpy;

  // Set up a spy before each test
  beforeEach(() => {
    consoleSpy = sinon.spy(console, 'log');
  });

  // Restore the spy after each test
  afterEach(() => {
    consoleSpy.restore();
  });

  it('should log the correct total when the totalAmount is 100 and totalShipping is 20', () => {
    sendPaymentRequestToApi(100, 20);

    // Verify the correct message was logged
    expect(consoleSpy.calledWith('The total is: 120')).to.be.true;
    
    // Verify console.log was called only once
    expect(consoleSpy.calledOnce).to.be.true;
  });

  it('should log the correct total when the totalAmount is 10 and totalShipping is 10', () => {
    sendPaymentRequestToApi(10, 10);

    // Verify the correct message was logged
    expect(consoleSpy.calledWith('The total is: 20')).to.be.true;

    // Verify console.log was called only once
    expect(consoleSpy.calledOnce).to.be.true;
  });
});
