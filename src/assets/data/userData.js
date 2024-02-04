// src/assets/data/userData.js

const fetchUserData = async (sessionToken, userType) => {
  try {
    const formData = new FormData();
    formData.append('Token', sessionToken);
    formData.append('User-Type', userType);
    const response = await fetch('https://your-api-endpoint.com/ownerData', {
            headers: {
            },

            body: JSON.stringify(formData),
            method: 'POST',
          });
    const data = await response.json();

    const userData = data.map((item) => ({
      id: item.id,
      username: item.username,
      email: item.email,
      firstName: item.firstName,
      lastName: item.lastName,
      avatarUrl: item.avatarUrl,
      // Add more fields as needed
    }));

    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};

const sessionToken = localStorage.getItem('sessionToken'); 
const userType = localStorage.getItem('userType'); 
const userData = await fetchUserData(sessionToken, userType);
export default userData;