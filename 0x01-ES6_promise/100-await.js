import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  let responseObject = {}; // Renamed variable for clarity

  try {
    // Await responses and assign to separate variables
    const photoResponse = await uploadPhoto();
    const userResponse = await createUser();

    // Populate the responseObject with the results
    responseObject = { photo: photoResponse, user: userResponse };
  } catch (error) {
    // If an error occurs, assign null values to photo and user
    responseObject = { photo: null, user: null };
  }

  return responseObject; // Return the final response object
}
