import React, { useState, useRef } from 'react';
import './timer.css';

const MS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MS_IN_MINUTE = SECONDS_IN_MINUTE * MS_IN_SECOND;

const formatTime = (timeParam) => {
  let time = timeParam;
  const parts = {
    minutes: 0,
    seconds: 0,
  };

  if (time > MS_IN_MINUTE) {
    parts.minutes = Math.floor(time / MS_IN_MINUTE);
    time %= MS_IN_MINUTE;
  }

  if (time > MS_IN_SECOND) {
    parts.seconds = Math.floor(time / MS_IN_SECOND);
    time %= MS_IN_SECOND;
  }

  return parts;
};

export const Timer = ({ maxMinutes }) => {
  const lastTickTiming = useRef(null);
  const [totalDuration, setTotalDuration] = useState(maxMinutes * MS_IN_MINUTE); // <-- 这是与 🟡 Stopwatch compoent的最大区别1！
  const [timerId, setTimerId] = useState(null);
  const isRunning = timerId != null;

  const startTimer = () => {
    lastTickTiming.current = Date.now();
    const timer = window.setInterval(() => {
      const now = Date.now();
      const timePassed = now - lastTickTiming.current;

      setTotalDuration((duration) => duration - timePassed); // <-- 这是与 🟡 Stopwatch compoent的最大区别2！
      lastTickTiming.current = now;
    }, 1);

    setTimerId(timer);
  };

  const stopInterval = () => {
    window.clearInterval(timerId);
    setTimerId(null);
  };

  const resetTimer = () => {
    stopInterval();
    setTotalDuration(maxMinutes * MS_IN_MINUTE); // difference with stopwatch
  };

  const toggleTimer = () => {
    if (isRunning) stopInterval();
    else startTimer();
  };

  const formattedTime = formatTime(totalDuration);

  return (
    <div>
      <button className='time'>
        <span>
          <span className='time-number'>{formattedTime.minutes}</span>
          <span className='time-unit'>m</span>
        </span>

        <span>
          <span className='time-number'>{formattedTime.seconds}</span>
          <span className='time-unit'>s</span>
        </span>
      </button>

      <div>
        <button
          onClick={() => {
            toggleTimer();
          }}
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button
          onClick={() => {
            resetTimer();
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};
