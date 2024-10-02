import uploadPhoto from './5-photo-reject'; // Adjust the path if necessary
import createUser from './4-user-promise'; // Adjust the path if necessary

export default async function asyncUploadUser() {
  try {
    const photo = await uploadPhoto('photo-profile-1'); // Call uploadPhoto
    const user = await createUser('Guillaume', 'Salva'); // Call createUser
    return {
      photo, // Return the result of uploadPhoto
      user, // Return the result of createUser
    };
  } catch (error) {
    return { photo: null, user: null }; // Return empty object on error
  }
}
