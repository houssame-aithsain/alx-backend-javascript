// 8-api/api.test.js
const request = require('request');
const { expect } = require('chai');

describe('Index page', () => {
  it('should return status code 200', (done) => {
    request('http://localhost:7865', (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('should return the correct message', (done) => {
    request('http://localhost:7865', (err, res, body) => {
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });

  it('should have a content-type of text/plain', (done) => {
    request('http://localhost:7865', (err, res, body) => {
      expect(res.headers['content-type']).to.include('text/plain');
      done();
    });
  });
});
