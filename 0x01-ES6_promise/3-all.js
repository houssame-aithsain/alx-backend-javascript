import { uploadPhoto, createUser } from './utils';

export default function handleProfileSignup() {
  // Use Promise.all to handle multiple promises
  return Promise.all([uploadPhoto(), createUser()])
    .then(([photo, user]) => {
      // Log the body, firstName, and lastName to the console
      console.log(`${photo.body} ${user.firstName} ${user.lastName}`);
    })
    .catch(() => {
      // Log an error message if any promise is rejected
      console.log('Signup system offline');
    });
}
