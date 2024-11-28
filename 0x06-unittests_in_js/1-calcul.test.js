const assert = require('assert');
const calculateNumber = require('./1-calcul');

describe('calculateNumber', () => {
  describe('SUM', () => {
    it('should correctly add two rounded numbers', () => {
      assert.strictEqual(calculateNumber('SUM', 1.4, 4.5), 6);
    });

    it('should handle negative numbers correctly', () => {
      assert.strictEqual(calculateNumber('SUM', -1.4, -4.5), -6);
    });

    it('should handle mixed positive and negative numbers', () => {
      assert.strictEqual(calculateNumber('SUM', -1.4, 4.5), 3);
    });
  });

  describe('SUBTRACT', () => {
    it('should correctly subtract two rounded numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', 1.4, 4.5), -4);
    });

    it('should handle negative numbers correctly', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -1.4, -4.5), 4);
    });

    it('should handle mixed positive and negative numbers', () => {
      assert.strictEqual(calculateNumber('SUBTRACT', -1.4, 4.5), -6);
    });
  });

  describe('DIVIDE', () => {
    it('should correctly divide two rounded numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 4.5), 0.2);
    });

    it('should return "Error" when dividing by 0', () => {
      assert.strictEqual(calculateNumber('DIVIDE', 1.4, 0), 'Error');
    });

    it('should handle division with negative numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', -4.5, 2.5), -2);
    });

    it('should handle division of two negative numbers', () => {
      assert.strictEqual(calculateNumber('DIVIDE', -4.5, -2.5), 2);
    });
  });

  describe('Invalid type', () => {
    it('should throw an error for invalid type', () => {
      assert.throws(() => calculateNumber('MULTIPLY', 1.4, 4.5), /Invalid type/);
    });
  });
});
