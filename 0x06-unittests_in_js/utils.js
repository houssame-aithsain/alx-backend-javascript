// utils.js
const Utils = {
    calculateNumber: (type, a, b) => {
      const roundA = Math.round(a);
      const roundB = Math.round(b);
  
      if (type === 'SUM') {
        return roundA + roundB;
      }
      if (type === 'SUBTRACT') {
        return roundA - roundB;
      }
      if (type === 'DIVIDE') {
        if (roundB === 0) {
          return 'Error';
        }
        return roundA / roundB;
      }
    }
};
  
module.exports = Utils;
