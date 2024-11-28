// 4-payment.test.js
const chai = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./4-payment');

const { expect } = chai;

describe('sendPaymentRequestToApi', () => {
  let consoleSpy;
  let calculateNumberStub;

  beforeEach(() => {
    // Create a spy to check if console.log is called with the correct message
    consoleSpy = sinon.spy(console, 'log');

    // Stub the calculateNumber function to always return 10
    calculateNumberStub = sinon.stub(Utils, 'calculateNumber').returns(10);
  });

  afterEach(() => {
    // Restore the original function and spy after each test
    consoleSpy.restore();
    calculateNumberStub.restore();
  });

  it('should call calculateNumber with correct arguments and log the correct message', () => {
    sendPaymentRequestToApi(100, 20);

    // Verify the stub was called with the correct arguments
    expect(calculateNumberStub.calledWith('SUM', 100, 20)).to.be.true;

    // Verify that the correct message was logged
    expect(consoleSpy.calledWith('The total is: 10')).to.be.true;
  });
});
