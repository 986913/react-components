import React, { useState } from 'react';
import './flightbooker.css';

/**
  padStart usage example:
    const fullNumber = '2034399002125581';
    const last4Digits = fullNumber.slice(-4);
    const maskedNumber = last4Digits.padStart(fullNumber.length, '*');
    console.log(maskedNumber); // "************5581"
 */

/* formatting Date() object to YYYY-MM_DD  */
const TODAY = formatDate(new Date());
const DAY_IN_MILLI_SECONDS = 24 * 60 * 60 * 1000; // 24小时*60分钟*60秒*1000毫秒

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return [year, month, day].join('-');
}

export const FlightBooker = () => {
  const [flightOption, setFlightOption] = useState('one-way');
  const [departureDate, setDepartureDate] = useState(
    formatDate(new Date(Date.now() + DAY_IN_MILLI_SECONDS)) // Tomorrow.
  );
  const [returnDate, setReturnDate] = useState(departureDate);
  const handleFlightTypeChange = (e) => setFlightOption(e.target.value);
  const handleDepartureChange = (e) => setDepartureDate(e.target.value);
  const handleReturnChange = (e) => setReturnDate(e.target.value);
  const hanldeSubmit = (e) => {
    e.preventDefault();
    if (flightOption === 'one-way') {
      alert(`You have booked a one-way flight on ${departureDate}`);
      return;
    }
    alert(
      `You have booked a return flight, departing on ${departureDate} and returning on ${returnDate}`
    );
  };

  return (
    <div>
      <form className='flight-booker' onSubmit={hanldeSubmit}>
        <select value={flightOption} onChange={handleFlightTypeChange}>
          <option value='one-way'>One-way flight</option>
          <option value='return'>Return flight</option>
        </select>

        <input
          aria-label='Departure date'
          type='date'
          value={departureDate}
          onChange={handleDepartureChange}
          min={TODAY} // 这是重点：specify the today date as the min of the depart date field and leverage the browser's form validation during submission
        />
        {flightOption === 'return' && (
          <input
            aria-label='Return date'
            type='date'
            value={returnDate}
            min={departureDate} // 这是重点：specify the current departure date as the min of the return date field and leverage the browser's form validation during submission
            onChange={handleReturnChange}
          />
        )}
        <button>Book</button>
      </form>
    </div>
  );
};
