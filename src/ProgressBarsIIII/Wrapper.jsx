import React, { useState } from 'react';
import './progressbarsIIII.css';

const CONCURT_LIMIT = 3; //   ---> 同时running的bars的个数
const DURATION = 2000; //     ---> run完单独的bar需要的毫秒数

/************************************* Parent Component *****************************************/
export const ProgressBarsIIIIWrapper = () => {
  const [progressBars, setProgressBars] = useState([0]); // <-- diff is here
  const [timerId, setTimerId] = useState(null);

  // Derived state to determine if the bars are progressing.
  const isProgressing = timerId != null;

  // diff is here:
  const appendBar = () => setProgressBars([...progressBars, 0]);

  const start = () => {
    const timer = setInterval(() => {
      setProgressBars((curAllBars) => {
        // Find the bars which aren't full.
        const nonFullBars = curAllBars
          .map((value, index) => {
            return { value, index };
          })
          .filter(({ value }) => value < 100);

        // if all bars are full, none to increment.
        if (nonFullBars.length === 0) return curAllBars;

        // Get the first LIMIT non-full bars and increment them.
        const barsToIncrement = nonFullBars.slice(0, CONCURT_LIMIT); // .slice提取数组或字符串的一部分  .slice(start, end)不包括end
        const newBars = curAllBars.slice();

        // 更新相对应index的bars的进度
        for (const { index } of barsToIncrement) {
          /* when bar is not full: we need 计算每10ms该增加多少progress(也就是求x)
              x        100
            -----  =  -------
            10(ms)   Duration(ms)
           所以 x = (100 * 10) / DURATION, 意思是每10ms对应增加的progress
        */
          const increased = (100 * 10) / DURATION;
          newBars[index] += increased;
        }

        // 返回更新后的all bars
        return newBars;
      });
    }, 10); // <--- 这里我写的每10ms， 你也可以改成其他数值的

    setTimerId(timer);
  };
  const pause = () => {
    clearInterval(timerId);
    setTimerId(null);
  };
  const reset = () => {
    pause();
    setProgressBars([0]);
  };

  return (
    <>
      <button onClick={appendBar}>Add Bar</button>

      <button onClick={isProgressing ? pause : start}>
        {isProgressing ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>

      <div>
        {progressBars.map((progress, index) => (
          <ProgressBar key={`${Math.random()}-${index}`} progress={progress} />
        ))}
      </div>

      <br />
      <hr />
      <br />
      <pre className='discription'>
        {JSON.stringify({ isProgressing, progressBars }, null, 2)}
      </pre>
    </>
  );
};

/************************************* Child Component *****************************************/
const ProgressBar = ({ progress }) => {
  return (
    <div className='progress-outterIIII'>
      {/* key point: 要用🟡transform: scaleX(百分数%)*/}
      <div
        className='progress-innerIIII'
        style={{ transform: `scaleX(${progress}%)` }}
        role='progressbar'
        aria-valuenow={progress}
      >
        {`${Math.floor(progress)}%`}
      </div>
    </div>
  );
};
