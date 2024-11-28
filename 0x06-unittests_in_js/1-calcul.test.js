const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('type == "SUM"', () => {
    it('should sum two rounded positive numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1.4, 2.6), 4);
    });

    it('should sum two rounded negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -1.4, -2.6), -4);
    });

    it('should sum a positive and a negative number', () => {
      assert.strictEqual(calculateNumber('SUM', 3.7, -1.2), 3);
    });

    it('should sum when one number is zero', () => {
      assert.strictEqual(calculateNumber('SUM', 0, 2.8), 3);
    });

    it('should sum two zero values', () => {
      assert.strictEqual(calculateNumber('SUM', 0, 0), 0);
    });
  });

  describe('type == "SUBTRACT"', () => {
    it('should subtract two rounded positive numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 5.7, 2.3), 4);
    });

    it('should subtract two rounded negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -4.5, -2.4), -2);
    });

    it('should subtract a positive and a negative number', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 3.6, -1.2), 5);
    });

    it('should subtract a number from zero', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 0, 1.6), -2);
    });

    it('should subtract two zero values', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 0, 0), 0);
    });
  });

  describe('type == "DIVIDE"', () => {
    it('should divide two rounded positive numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 8.7, 2.3), 4);
    });

    it('should divide two rounded negative numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', -8.7, -2.3), 4);
    });

    it('should divide a positive and a negative number', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 7.6, -2.2), -4);
    });

    it('should divide zero by a number', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 0, 3.6), 0);
    });

    it('should return "Error" when dividing by zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 3.6, 0), 'Error');
    });

    it('should return "Error" when dividing zero by zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 0, 0), 'Error');
    });
  });
});
