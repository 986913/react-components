import React, { useState, useEffect } from 'react';
import './progressbarsII.css';

/**************************************** Parent Component ***************************************/
export const ProgressBarsII = () => {
  const [barCounts, setBarCounts] = useState(0);
  const [numOfFilledBars, setNumOfFilledBars] = useState(0); //  <-- diff

  const handleClick = () => setBarCounts(barCounts + 1);
  const handleComplete = () => setNumOfFilledBars(numOfFilledBars + 1);

  return (
    <div>
      <button onClick={handleClick}>Add</button>

      <div>
        {Array.from({ length: barCounts }).map((_, index) => (
          <ProgressBarII
            key={index}
            duration={1000}
            isTurn={index > numOfFilledBars} // <-- diff
            onCompleted={handleComplete} // <-- diff
          />
        ))}
      </div>
    </div>
  );
};

/**************************************** Chind Component ***************************************/

const ProgressBarII = ({ duration, isTurn, onCompleted }) => {
  const [isTransitinoStarted, setStartTransition] = useState(false);

  useEffect(() => {
    // diff is here ---> 没轮到当前进度条时,或者动画已经启动的情况下  直接退出,不启动动画
    if (isTurn || isTransitinoStarted) return;
    //轮到当前进度条时 会启动动画
    setStartTransition(true);
  }, [isTurn, isTransitinoStarted]);

  const handleTransitionEnd = () => onCompleted();

  return (
    <div className='progress-outterII'>
      <div
        className={classNames(
          'progress-innerII',
          isTransitinoStarted && 'bar-filledII' //在这动态添加"bar-filledII" css class
        )}
        style={{ transitionDuration: `${duration}ms` }}
        /* ❗重点❗ 自带的onTransitionEnd属性能detect when a CSS transition is complete */
        onTransitionEnd={handleTransitionEnd}
      ></div>
    </div>
  );
};

// 👍 helper function (这是简易版，完整版看src/classNames.js)
const classNames = (...args) => args.filter(Boolean).join(' ');
