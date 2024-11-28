// 6-payment_token.test.js
const chai = require('chai');
const getPaymentTokenFromAPI = require('./6-payment_token');

const { expect } = chai;

describe('getPaymentTokenFromAPI', () => {
  it('should resolve with the correct data when success is true', (done) => {
    getPaymentTokenFromAPI(true)
      .then((response) => {
        expect(response).to.deep.equal({ data: 'Successful response from the API' });
        done(); // Call done() to indicate that the test is complete
      })
      .catch((error) => done(error)); // If an error occurs, pass it to done()
  });

  it('should do nothing when success is false', (done) => {
    getPaymentTokenFromAPI(false)
      .then((response) => {
        // No response should be received
        expect(response).to.be.undefined;
        done(); // Call done() to indicate that the test is complete
      })
      .catch((error) => done(error)); // If an error occurs, pass it to done()
  });
});
