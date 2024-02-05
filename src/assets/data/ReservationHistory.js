// src/assets/data/ReservationHistory.js

const fetchReservationHistory = async (sessionToken, userType) => {
    try {
      const formData = new FormData();
      formData.append('Token', sessionToken);
      formData.append('User-Type', userType);
  
      const response = await fetch('https://your-api-endpoint.com/reservationHistory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      return data.reservationHistory || [];
    } catch (error) {
      console.error('Error fetching reservation history:', error);
      return [];
    }
  };
  
  export default fetchReservationHistory;
  