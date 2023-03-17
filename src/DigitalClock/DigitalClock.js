import React from 'react';
import { useCurrentDate } from './useCurrentDate';
import './digitalClock.css';

const padTwoDigit = (n) => (n < 10 ? `0${n}` : String(n));

const ClockImplement = ({ hours, minutes, seconds }) => {
  const datetime = `
    ${padTwoDigit(hours)} : 
    ${padTwoDigit(minutes)} : 
    ${padTwoDigit(seconds)}
  `;
  return (
    <div className='digit-clock'>
      <time datetime={datetime}> {datetime} </time>
    </div>
  );
};

export const DigitalClock = () => {
  const date = useCurrentDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return <ClockImplement hours={hours} minutes={minutes} seconds={seconds} />;
};
