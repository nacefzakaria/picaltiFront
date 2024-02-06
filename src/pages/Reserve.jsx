import React, { useState,useEffect } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from '../components/UI/TimePicker'; // Import the new TimePicker component
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import '../styles/Calendar.css'; // Import your own CSS file
import { useParams } from 'react-router-dom';
import carData from '../assets/data/carData';
import fetchAllBikeReservations from '../assets/data/reservations';
const ReservationForm = () => {
  const { slug } = useParams();

  const singleCarItem = carData.find((item) => item.carName === slug);
  const fakeReservedTimes = {
    '2024-03-01': ['10', '14', '16'],
    '2024-03-02': ['11', '15', '17'],
    // Add more dates and reserved hours as needed
  };
  // Fetch all reservations for the selected car
  const [allReservedTimes, setAllReservedTimes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const reservations = await fetchAllBikeReservations(singleCarItem.id);
      setAllReservedTimes(reservations);
    };

    fetchData();});
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [singleCarItem]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [dateTosend, setDateTosend] = useState(null);
  const [endhour, setendhour] = useState(null);
  const [starthour, setstarthour] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]);
  const [reservedTimes, setReservedTimes] = useState([]);
 //change the date format
 const formatDate = (date) => {
    // Add your date formatting logic here
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
// handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Fetch reserved times for the selected date
    const formattedDate = formatDate(date);
    console.log('Formatted Date:', formattedDate); 
    setDateTosend(formattedDate);
    const reservedTimesForDate = allReservedTimes[formattedDate] || [];
    console.log('Reserved Times:', reservedTimesForDate);
    setReservedTimes(reservedTimesForDate);
    setSelectedHours([]);
    return formattedDate;
  };

  const handleHourSelection = (hour) => {
    setSelectedHours((prevHours) => {
      // Check if the hour is already selected
      const isHourSelected = prevHours.includes(hour);

      if (isHourSelected) {
        // If already selected, remove it from the selection
        return prevHours.filter((selectedHour) => selectedHour !== hour);
      } else {
        // If not selected, add it to the selection
        return [...prevHours, hour];
      }
    });
  };
  useEffect(() => {
    // Check if there are selected hours
    if (selectedHours.length > 0) {
      // Set the start hour to the first selected hour
      setstarthour(selectedHours[0]);
  
      // Set the end hour to the last selected hour
      setendhour(selectedHours[selectedHours.length - 1]);
    } else {
      // If no hours selected, reset start and end hours
      setstarthour(null);
      setendhour(null);
    }
  }, [selectedHours]);
  console.log("start hour", starthour)
  console.log("end hour", endhour)
  const isSuccessiveHours = (prevHour, currentHour) => {
    const prevTime = new Date(prevHour).getTime();
    const currentTime = new Date(currentHour).getTime();

    return currentTime === prevTime + 60 * 60 * 1000; // Check if the current hour is the next successive hour
  };
// send the informations and user solde to the backend
const [reservationStatus, setReservationStatus] = useState(null);
const sessionToken = localStorage.getItem('sessionToken'); 
const userType = localStorage.getItem('userType'); 
const handleSubmit = async () => {
  try {
    if (selectedDate && selectedHours.length > 0) {
      const formData = new FormData();
      formData.append('Token', sessionToken);
      formData.append('User-Type', userType);
      formData.append('dateTosend', dateTosend);
      formData.append('starthour', starthour);
      formData.append('endhour', endhour);
      const response = await fetch('https://your-backend-api.com/reservation', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        if (result.isOkay === 'okay') {
          // Redirect to the dashboard or update UI as needed
          // You can use react-router-dom for redirection
          // For simplicity, setting a success message here
          setReservationStatus('success');
        } else if (result.isOkay === 'no') {
          // Show insufficient funds message
          setReservationStatus('insufficientFunds');
        }
      } else {
        // Handle other server errors
        setReservationStatus('error');
      }
    } else {
      // Handle case where date or hours are not selected
      setReservationStatus('missingSelection');
    }
  } catch (error) {
    console.error('Error submitting reservation:', error);
    // Handle error, show error message, etc.
    setReservationStatus('error');
  }
};

  return (
    <div>
    <div className="reservation-form">
   
      <div className="calendar-container">
        <h2>Select Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline
          minDate={new Date()}
        />
      </div>

      {selectedDate && (
        <div className="time-picker-container">
          <h2>Select the from when to when</h2>
          <TimePicker
            reservedTimes={reservedTimes}
            selectedHours={selectedHours}
            onHourSelection={handleHourSelection}
          />
        </div>
      )}
        <div className="submit-button-container">
            <img src={singleCarItem.imgUrl} alt="" className="w-100" />
            <h6 className="rent__price text-center mt-">
            {singleCarItem.price}.00 DH<span>/ Hour</span>
            </h6>
            <button className="submit-button" onClick={handleSubmit}>
            Submit Reservation
            </button>
        </div>
    </div>
    <div className="message-container">
    {reservationStatus === 'success' && (
      <p style={{ color: 'green' }}>
        Your reservation has been added successfully. Redirecting to the dashboard...
      </p>
    )}
    {reservationStatus === 'insufficientFunds' && (
      <p style={{ color: 'red' }}>
        Your balance is insufficient. Please <a href="/add-credits">add credits</a>.
      </p>
    )}
    {reservationStatus === 'missingSelection' && (
      <p style={{ color: 'orange' }}>
        Please select both date and hours.
      </p>
    )}
    {reservationStatus === 'error' && (
      <p style={{ color: 'red' }}>
        Failed to submit reservation. Please try again later.
      </p>
    )}
  </div>
  </div>
  );
};

export default ReservationForm;
