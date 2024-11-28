const getPaymentTokenFromAPI = (success) => new Promise((resolve, _reject) => {
    if (success) {
      resolve({data: 'Successful response from the API'});
    }
  });
  
module.exports = getPaymentTokenFromAPI; // Export the function for testing
