import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/Calendar.css'; // Create a separate CSS file for custom styling

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState([]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedHours([]);
  };

  const handleHourClick = (hour) => {
    setSelectedHours((prevHours) => {
      const index = prevHours.indexOf(hour);
      if (index === -1) {
        return [...prevHours, hour];
      } else {
        return prevHours.filter((h) => h !== hour);
      }
    });
  };

  // Simulated reserved hours (replace with actual data)
  const reservedHours = [10, 12, 14, 16];

  return (
    <div>
      <h2>Select Date and Hours:</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        inline
      />

      {selectedDate && (
        <div>
          <h3>Selected Hours:</h3>
          <div className="hours-container">
            {[10, 11, 12, 13, 14, 15, 16, 17].map((hour) => (
              <div
                key={hour}
                className={`hour ${selectedHours.includes(hour) ? 'selected' : ''} ${
                  reservedHours.includes(hour) ? 'reserved' : ''
                }`}
                onClick={() => handleHourClick(hour)}
              >
                {hour}:00
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
