import React, { useState } from 'react';
import './progressbar.css';

const DURATION = 3000;

/************************************* Parent Component *****************************************/
export const ProgressBarIWrapper = () => {
  const [progress, setProgress] = useState(0);
  const [timerId, setTimerId] = useState(null);

  // Derived state to determine if the bars are progressing.
  const isProgressing = timerId != null;

  const start = () => {
    const timer = setInterval(() => {
      //setProgress使用🟡函数作为参数 ----> 这种使用函数来计算新的状态值的方式，可以避免因为异步更新导致的状态不同步的问题。
      setProgress((prevProgress) => {
        // once bar is full, none to increment.
        if (prevProgress >= 100) return prevProgress;
        return prevProgress + (100 * 10) / DURATION;
        /* when bar is not full: we need 计算每10ms该增加多少progress(也就是求x)
              x        100
            -----  =  -------
            10(ms)   Duration(ms)

           所以 x = (100 * 10) / DURATION, 意思是每10ms对应增加的progress
        */
      });
    }, 10);

    setTimerId(timer);
  };
  const pause = () => {
    clearInterval(timerId);
    setTimerId(null);
  };
  const reset = () => {
    pause();
    setProgress(0);
  };

  return (
    <>
      <button onClick={isProgressing ? pause : start}>
        {isProgressing ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>reset</button>

      <ProgressBar progress={progress} />
    </>
  );
};

/************************************* Child Component *****************************************/
const ProgressBar = ({ progress }) => {
  return (
    <div className='outter'>
      {/* key point: 要用🟡transform: scaleX(百分数%)*/}
      <div className='inner' style={{ transform: `scaleX(${progress}%)` }}>
        {`${Math.floor(progress)}%`}
      </div>
    </div>
  );
};
