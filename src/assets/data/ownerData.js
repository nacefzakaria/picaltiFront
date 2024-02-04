// src/assets/data/ownerData.js

const fetchOwnerData = async (sessionToken, userType) => {
    try {
        const formData = new FormData();
        formData.append('Token', sessionToken);
        formData.append('User-Type', userType);
        const response = await fetch('https://your-api-endpoint.com/ownerData', {
            
            body: JSON.stringify(formData),
            method: 'POST',
          });
      const data = await response.json();
      const ownerData = data.map((item) => ({
        id: item.id,
        name: item.name,
        company: item.company,
        email: item.email,
        phone: item.phone,
        // Add more fields as needed
      }));
  
      return ownerData;
    } catch (error) {
      console.error('Error fetching owner data:', error);
      return [];
    }
  };
const sessionToken = localStorage.getItem('sessionToken'); 
const userType = localStorage.getItem('userType'); 
const ownerData = await fetchOwnerData(sessionToken, userType);
  
  export default ownerData;
  