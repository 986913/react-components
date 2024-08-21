import React, { useState, useRef } from 'react';
import './slider.css';

export const Slider = ({ initial, onChange }) => {
  const sliderRef = useRef(null);
  
  const [percentage, setPercentage] = useState(initial);

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;

    // 直接使用鼠标当前位置相对于 slider 左边缘的位置
    let newX = e.clientX - sliderRef.current.getBoundingClientRect().left;

    const sliderWidth = sliderRef.current.offsetWidth;
    const thumbWidth = 10; // 假设滑块的宽度10px
    const start = 0;
    const end = sliderWidth - thumbWidth;

    // 限制 newX 在 slider 的范围内
    if (newX < start) newX = start;
    if (newX > end) newX = end;

    // 计算 newX 对应的百分比位置
    const newPercentage = (newX / end) * 100;
    setPercentage(newPercentage); // 更新状态

    // 调用 onChange 回调，将滑块位置的值传递给父组件
    onChange(newPercentage.toFixed(0));
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleOnMouseDown = (e) => {
    if (!sliderRef.current) return;

    // 添加 mousemove 和 mouseup 事件监听器
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className='slider-outer' ref={sliderRef}>
      <div className='slider-inner'>
        <span
          className='thumb'
          style={{ left: `calc(${percentage}% - 5px)` }} // 根据百分比设置滑块的位置
          onMouseDown={handleOnMouseDown} // 当鼠标按下时开始滑动
        />
      </div>
    </div>
  );
};
