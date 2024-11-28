const { expect } = require('chai');
const request = require('request');

describe('API integration test', function () {
  const API_URL = 'http://localhost:7865';

  before(function (done) {
    // Optional: perform any setup here if needed
    done();
  });

  after(function (done) {
    // Optional: clean up or shutdown server after tests if needed
    done();
  });

  it('should return status code 200 and correct message for GET /', function (done) {
    request.get(`${API_URL}/`, (err, res, body) => {
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });
});
