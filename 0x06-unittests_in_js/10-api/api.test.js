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

  describe('GET /available_payments', function () {
    it('should return the correct response structure', function (done) {
      request.get(`${API_URL}/available_payments`, (err, res, body) => {
        if (err) return done(err);
        const response = JSON.parse(body);
        expect(res.statusCode).to.equal(200);
        expect(response).to.deep.equal({
          payment_methods: {
            credit_cards: true,
            paypal: false
          }
        });
        done();
      });
    });
  });

  describe('POST /login', function () {
    it('should return correct response with the username', function (done) {
      request.post(
        `${API_URL}/login`,
        {
          json: { userName: 'Betty' },
          headers: { 'Content-Type': 'application/json' }
        },
        (err, res, body) => {
          if (err) return done(err);
          expect(res.statusCode).to.equal(200);
          expect(body).to.equal('Welcome Betty');
          done();
        }
      );
    });
  });
});
