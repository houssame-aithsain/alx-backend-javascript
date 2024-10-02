export default function uploadPhoto(filename) {
  // Return a rejected promise with an Error object
  return Promise.reject(new Error(`${filename} cannot be processed`));
}
