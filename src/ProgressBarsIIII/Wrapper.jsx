import React, { useState } from 'react';
import './progressbarsIIII.css';

/*********************** Glocal Setting ***********************/
const CONCURT_LIMIT = 4; //   ---> 同时running的bars的个数
const DURATION = 2000;  //     ---> run完单独的bar需要的毫秒数
/**************************************************************/


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
       // !注意这步 --> 过滤出尚未满的进度条的进度value和index
        const nonFullBars = curAllBars
          .map((value, index) => ({ value, index }))
          .filter(({ value }) => value < 100);

        // 如果所有进度条都已经满了，直接返回当前状态
        if (nonFullBars.length === 0) return curAllBars;

        const newBars = curAllBars.slice();
        // 使用for循环更新-未满进度条，只递增前CONCURT_LIMIT个未满的进度条
        for (let i = 0; i < nonFullBars.length; i++) {
          if(i<CONCURT_LIMIT){
            const {value, index} = nonFullBars[i];
            newBars[index] += ((100 * 10) / DURATION)
            /* when bar is not full: we need 计算每10ms该增加多少progress(也就是求x)
                x        100
              -----  =  -------
              10(ms)   Duration(ms)
              所以 x = (100 * 10) / DURATION, 意思是每10ms对应增加的progress
            */
          }
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
