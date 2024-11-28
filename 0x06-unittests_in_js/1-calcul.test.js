const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('type == "SUM"', () => {
    it('positive numbers with one rounded up', () => {
      assert.strictEqual(calculateNumber('SUM', 1.7, 2.1), 4);
    });

    it('positive and zero', () => {
      assert.strictEqual(calculateNumber('SUM', 3.5, 0.4), 4);
    });

    it('negative and zero', () => {
      assert.strictEqual(calculateNumber('SUM', -3.7, 0.4), -3);
    });

    it('mixed numbers with rounding down', () => {
      assert.strictEqual(calculateNumber('SUM', -2.2, 3.2), 1);
    });

    it('large positive numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 100.4, 200.6), 301);
    });

    it('large negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -150.5, -249.5), -400);
    });

    it('both values at rounding threshold', () => {
      assert.strictEqual(calculateNumber('SUM', 2.5, -2.5), 0);
    });
  });

  describe('type == "SUBTRACT"', () => {
    it('subtract small numbers with rounding up', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.8, 0.7), 1);
    });

    it('subtract with one negative value', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -3.4, 1.2), -5);
    });

    it('subtract two large numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 500.5, 300.3), 200);
    });

    it('subtract with zero', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 4.6, 0), 5);
    });

    it('subtract negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -2.8, -4.1), 1);
    });

    it('subtract mixed values at rounding threshold', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 2.5, 1.5), 1);
    });

    it('subtract zeros', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 0, 0), 0);
    });
  });

  describe('type == "DIVIDE"', () => {
    it('divide positive numbers with rounding down', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 7.3, 3.6), 2);
    });

    it('divide with one negative number', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 8.4, -2.2), -4);
    });

    it('divide two negative numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', -9.7, -3.1), 3);
    });

    it('divide with numerator as zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 0, 2.5), 0);
    });

    it('divide with denominator as zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 4.5, 0), 'Error');
    });

    it('divide with denominator rounded down to zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 3.8, 0.4), 'Error');
    });

    it('divide with both numbers as zero', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 0, 0), 'Error');
    });

    it('divide large numbers with rounding', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1000.7, 250.2), 4);
    });

    it('divide small numbers with rounding up', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 2.5, 0.8), 3);
    });

    it('divide with one number at rounding threshold', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 2.5, 2.5), 1);
    });
  });
});
