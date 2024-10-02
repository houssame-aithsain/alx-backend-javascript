export default function handleResponseFromAPI(promise) {
  console.log('Got a response from the API');
  promise
    .then((result) => ({ // eslint-disable-line no-unused-vars
      status: 200,
      body: 'Success',
    }))
    .catch((error) => Error()); // eslint-disable-line no-unused-vars
}
