const assert = require('assert');
const calculateNumber = require('./0-calcul');

describe('calculateNumber', () => {
  it('negative whole numbers', () => {
    assert.strictEqual(calculateNumber(-1, -2), -3);
  });

  it('negative and positive numbers', () => {
    assert.strictEqual(calculateNumber(-1.4, 2.6), 2); // -1 rounded to -1, 2.6 rounded to 3
  });

  it('rounding both numbers to zero', () => {
    assert.strictEqual(calculateNumber(0.4, -0.4), 0); // 0.4 and -0.4 both round to 0
  });

  it('large numbers', () => {
    assert.strictEqual(calculateNumber(1000.7, 2000.3), 3001); // 1000.7 rounded to 1001, 2000.3 to 2000
  });

  it('small fractional numbers rounding up', () => {
    assert.strictEqual(calculateNumber(0.5, 0.5), 2); // Both round to 1
  });

  it('small fractional numbers rounding down', () => {
    assert.strictEqual(calculateNumber(0.4, 0.4), 0); // Both round to 0
  });

  it('one large number and one small fractional number', () => {
    assert.strictEqual(calculateNumber(10000.1, 0.5), 10001); // 10000.1 rounds to 10000, 0.5 rounds to 1
  });

  it('both numbers with extreme fractional precision', () => {
    assert.strictEqual(calculateNumber(1.4999999999, 2.5000000001), 4); // 1.499... rounds to 1, 2.500... rounds to 3
  });

  it('rounding a number near max safe integer', () => {
    assert.strictEqual(calculateNumber(Number.MAX_SAFE_INTEGER - 0.4, 0.4), Number.MAX_SAFE_INTEGER); // Safe rounding
  });

  it('handling one number as zero', () => {
    assert.strictEqual(calculateNumber(0, 5.9), 6); // 0 remains 0, 5.9 rounds to 6
  });
});
