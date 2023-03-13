import React, { useState } from 'react';
import './progressbarsIIII.css';

const ProgressBarIIII = ({ progress }) => {
  return (
    <div className='progress-outterIIII'>
      <div
        className='progress-innerIIII'
        style={{ transform: `scaleX(${progress / 100})` }}
      ></div>
    </div>
  );
};

export const ProgressBarsIIII = ({ concurrencyLimit, duration }) => {
  const [progression, setProgression] = useState([0]);
  const [timerId, setTimerId] = useState(null);

  const start = () => {
    const timer = window.setInterval(() => {
      setProgression((currProgression) => {
        // Find the bars which aren't full.
        const nonFullBars = currProgression
          .map((value, index) => ({ value, index }))
          .filter(({ value }) => value < 100);

        // All bars are full, none to increment.
        if (nonFullBars.length === 0) return currProgression;

        // Get the first LIMIT non-full bars and increment them.
        const barsToIncrement = nonFullBars.slice(0, concurrencyLimit);
        const newProgression = currProgression.slice();
        for (const { index } of barsToIncrement) {
          /* 计算每10ms该增加多少progress(也就是求x)
              x        100
            -----  =  -----
              10     duration(ms)
          */
          const increaseRate = (100 * 10) / duration;
          newProgression[index] += increaseRate;
        }
        return newProgression;
      });
    }, 10);

    setTimerId(timer);
  };

  const stop = () => {
    window.clearInterval(timerId);
    setTimerId(null);
  };

  const appendBar = () => setProgression(progression.concat(0));

  const reset = () => {
    stop();
    setProgression([0]);
  };

  // Derived state to determine if the bars are progressing.
  const isProgressing = timerId != null;

  return (
    <div>
      <button onClick={() => appendBar()}>Add</button>
      <button
        onClick={() => {
          isProgressing ? stop() : start();
        }}
      >
        {isProgressing ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => reset()}>Reset</button>

      <div>
        {progression.map((progress, index) => (
          <ProgressBarIIII key={index} progress={progress} />
        ))}
      </div>

      <pre className='progressPre'>
        {JSON.stringify({ isProgressing, progression }, null, 2)}
      </pre>
    </div>
  );
};
