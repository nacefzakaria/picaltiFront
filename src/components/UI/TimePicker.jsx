import React from 'react';
import '../../styles/Calendar.css';

const TimePicker = ({ reservedTimes, selectedHours, onHourSelection }) => {
  const allHours = Array.from({ length: 13 }, (_, index) => index + 8); // Hours from 8 to 20

  return (
    <div className="time-picker">
      {allHours.map((hour) => {
        const isReserved = reservedTimes.includes(`${hour}`);
        const isSelected = selectedHours.includes(hour);
        return (
          <button
            key={hour}
            className={`time-button ${isSelected ? 'selected' : ''} ${
              isReserved ? 'reserved' : ''
            }`}
            onClick={() => onHourSelection(hour)}
            disabled={hour < 8 || hour > 19 || isReserved}
          >
            {`${hour}:00`}
          </button>
        );
      })}
    </div>
  );
};

export default TimePicker;
