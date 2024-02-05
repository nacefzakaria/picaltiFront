// src/assets/data/userData.js

const fetchAllBikeReservations = async (bikeId) => {
    try {
      const formData = new FormData();
      formData.append('bikeId', bikeId);
      const response = await fetch('https://your-api-endpoint.com/allBikeReservations',{
                    headers: {
                    },

                    body: JSON.stringify(formData),
                    method: 'POST',
                });
      const data = await response.json();
  
      // Construct a variable similar to fakeReservedTimes
      const allReservedTimes = {};
  
      data.forEach((item) => {
        if (item.bikeId === bikeId) { // Filter reservations for the specified bikeId
          const date = item.date; // Replace with the actual field name for the date in your API response
          const startHour = item.startHour;
          const endHour = item.endHour; 
  
          for (let currentHour = startHour; currentHour < endHour; currentHour++) {
            const formattedHour = String(currentHour).split(":")[0];
            console.log(formattedHour); 
  
            const date = item.date; // Replace with the actual field name for the date in your API response
  
            if (!allReservedTimes[date]) {
              allReservedTimes[date] = [];
            }
  
            allReservedTimes[date].push(formattedHour);
          }
        }
      });
  
      return allReservedTimes;
    } catch (error) {
      console.error('Error fetching bike reservations:', error);
      return {};
    }
  };
  
  export default fetchAllBikeReservations;
  