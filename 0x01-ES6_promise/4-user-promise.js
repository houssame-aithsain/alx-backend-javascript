export default function signUpUser(firstName, lastName) {
  // Return a resolved promise with an object containing firstName and lastName
  return Promise.resolve({
    firstName,
    lastName,
  });
}
