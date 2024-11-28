const request = require('request');
const { expect } = require('chai');

describe('API integration test', function () {
  const API_URL = 'http://localhost:7865';

  it('GET / returns correct response', function (done) {
    request.get(`${API_URL}/`, (err, res, body) => {
      if (err) return done(err);
      expect(res.statusCode).to.equal(200);
      expect(body).to.equal('Welcome to the payment system');
      done();
    });
  });

  describe('GET /cart/:id', function () {
    it('should return correct response when :id is a number', function (done) {
      request.get(`${API_URL}/cart/12`, (err, res, body) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(200);
        expect(body).to.equal('Payment methods for cart 12');
        done();
      });
    });

    it('should return 404 when :id is NOT a number', function (done) {
      request.get(`${API_URL}/cart/hello`, (err, res, body) => {
        if (err) return done(err);
        expect(res.statusCode).to.equal(404);
        expect(body).to.include('Not Found');
        done();
      });
    });
  });
});
