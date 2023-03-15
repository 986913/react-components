import React from 'react';
import { useCurrentDate } from './useCurrentDate';
import { ClockImplement } from './ClockImplement';
import './analogclock.css';

export const AnalogClock = () => {
  const date = useCurrentDate();
  //%12 是因为可以把17 --> 变成5  (24hr制)
  const hours = date.getHours() % 12;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // console.log(date, hours, minutes, seconds);
  return (
    <ClockImplement
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      size={100}
    />
  );
};
