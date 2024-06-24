import React, { useState, useEffect } from 'react';
import './progressbars.css';

/**************************************** Parent Component ***************************************/
export const ProgressBars = () => {
  const [barCounts, setBarCounts] = useState(0);
  const handleClick = () => setBarCounts(barCounts + 1);

  return (
    <div>
      <button onClick={handleClick}>Add</button>
      <div>
        {Array.from({ length: barCounts }).map((_, index) => (
          // 重点在这： key一定要对好, 要不然所有bars会同步执行了。。。
          <ProgressBar key={index} duration={4000} />
        ))}
      </div>
    </div>
  );
};

/**************************************** Chind Component ***************************************/
const ProgressBar = ({ duration }) => {
  const [startTransition, setStartTransition] = useState(false);

  //在组件首次渲染后启动动画: Start transition after first render and never apply this effect again.
  useEffect(() => {
    if (startTransition) return;
    setStartTransition(true);
  }, []);

  return (
    <div className='progress-outter'>
      <div
        style={{ transitionDuration: `${duration}ms` }}
        //在这动态添加"bar-filled" css class
        className={['progress-inner', startTransition && 'bar-filled']
          .filter(Boolean)
          .join(' ')}
      ></div>
    </div>
  );
};
