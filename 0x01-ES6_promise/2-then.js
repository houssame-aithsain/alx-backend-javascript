export default function handleResponseFromAPI(promise) {
  return promise
    .then(() => {
      console.log('Got a response from the API'); // Log the message when resolved
      return {
        status: 200,
        body: 'success',
      };
    })
    .catch(() => {
      console.log('Got a response from the API'); // Log the message when rejected
      return new Error(); // Return an empty Error object on rejection
    });
}
