

const fetchData = async () => {
  try {
    const response = await fetch('https://your-api-endpoint.com/bikeData'); // Replace with your actual API endpoint
    const data = await response.json();

    const bikeData = data.map((item) => ({
      id: item.id,
      brand: item.brand,
      rating: item.rating,
      carName: item.carName,
      imgUrl: item.imgUrl,
      model: item.model,
      price: item.price,
      spStation: item.Station,
      gps: item.gps,
      seatType: item.seatType,
      automatic: item.automatic,
      description: item.description,
    }));
    return bikeData;
  } catch (error) {
    console.error('Error fetching bike data:', error);
    return [];
  }
};

const bikeData = await fetchData();

export default bikeData;
