import React, { useState } from 'react';
import './flightbooker.css';

/* formatting Date() object to YYYY-MM_DD  */
const getToday = () => {
  const today = new Date();
  return `${today.getFullYear()}-${
    today.getMonth() < 12 ? today.getMonth() + 1 : 1
  }-${today.getDate()}`;
};

export const FlightBooker = () => {
  const [isReturnFlight, setReturnFlight] = useState(false);
  const [departTime, setDepartTime] = useState(null);
  const [returnTime, setReturnTime] = useState(null);

  const changeType = (e) =>
    setReturnFlight(e.target.value === 'roundway' ? true : false);
  const handleDepartOnChange = (e) => setDepartTime(e.target.value);
  const handleReturnOnChange = (e) => setReturnTime(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      isReturnFlight
        ? `You have booked a return flight, departing on ${departTime} and returning on ${returnTime}`
        : `You have booked a one-way flight on ${departTime}`
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <select name='flightType' onChange={changeType}>
          <option value='oneway'> one way flight </option>
          <option value='roundway'> round way flight </option>
        </select>
      </div>

      <input
        type='date'
        name='depart-time'
        min={getToday()} /* specify the today date as the min of the depart date field and leverage the browser's form validation during submission */
        onChange={handleDepartOnChange}
      />
      {isReturnFlight && (
        <input
          type='date'
          name='return-time'
          min={
            departTime
          } /* specify the current departure date as the min of the return date field and leverage the browser's form validation during submission */
          onChange={handleReturnOnChange}
        />
      )}

      <button type='submit'> submit </button>
    </form>
  );
};
