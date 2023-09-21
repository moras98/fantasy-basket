import API from './client';

// API interface for loading the user's profile
export const fetchUser = async (userId) => {
  try {
    const response = await API.post(`users/${userId}`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

export const fetchUsernames = async() => {
  try {
    const response = await API.get('users/usernames');
    return response.data;
  } catch(err){
    throw err.response.data;
  }
}