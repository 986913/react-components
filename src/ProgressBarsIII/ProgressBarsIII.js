import React, { useState, useEffect } from 'react';
import './progressbarsIII.css';

/**************************************** Parent Component ***************************************/
export const ProgressBarsIII = ({ concurrencyLimit }) => {
  const [barCounts, setBarCounts] = useState(0);
  const [numOfFilledBars, setNumOfFilledBars] = useState(0);

  const handleClick = () => setBarCounts(barCounts + 1);
  const handleComplete = () => setNumOfFilledBars(numOfFilledBars + 1);

  return (
    <div>
      <button onClick={handleClick}>Add</button>

      <div>
        {Array.from({ length: barCounts }).map((_, index) => (
          <ProgressBarIII
            key={index}
            duration={1000}
            isTurn={index < numOfFilledBars + concurrencyLimit} // <---- diff is here
            onCompleted={handleComplete}
          />
        ))}
      </div>
    </div>
  );
};

/**************************************** Chind Component ***************************************/
const ProgressBarIII = ({ duration, isTurn, onCompleted }) => {
  const [isTransitinoStarted, setStartTransition] = useState(false);

  useEffect(() => {
    // 没轮到当前进度条时,或者动画已经启动的情况下  直接退出,不启动动画
    if (!isTurn || isTransitinoStarted) return;
    //轮到当前进度条时 会启动动画
    setStartTransition(true);
  }, [isTurn, isTransitinoStarted]);

  const handleTransitionEnd = () => onCompleted();

  return (
    <div className='progress-outterIII'>
      <div
        style={{ transitionDuration: `${duration}ms` }}
        className={classNames(
          'progress-innerIII',
          isTransitinoStarted && 'bar-filledIII' //在这动态添加"bar-filledIII" css class
        )}
        /* ❗重点❗ 自带的onTransitionEnd属性能detect when a CSS transition is complete */
        onTransitionEnd={handleTransitionEnd}
      ></div>
    </div>
  );
};

// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');
