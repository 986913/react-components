import React, { useState, useRef } from 'react';
import './slider.css';

export const Slider = ({ initial, onChange }) => {
  const sliderRef = useRef(null);
  const [percentage, setPercentage] =  useState(initial);

  const handleOnMouseDown = (e) => {
    if (!sliderRef.current) return;
    // 全局添加 mousemove 和 mouseup 事件监听器
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!sliderRef.current) return;

    /* Step1: 获取当前点击点 相对于 slider元素左边缘的水平坐标（newX） = 当前点击点相对于视口窗的水平坐标 - slider元素左边缘水平坐标 */
    let newX = e.clientX - sliderRef.current.getBoundingClientRect().left; 

    /* Step2: 计算newX对应的百分比位置 */
    const sliderWidth = sliderRef.current.getBoundingClientRect().width;
    const start = 0;
    const end = sliderWidth - 10; //假设滑块的宽度10px
    // 限制 newX 在 slider[0, sliderWidth-10] 的范围内
    if (newX < start) newX = start;
    if (newX > end) newX = end;
    // 计算 newX 对应的百分比位置
    const newPercentage = (newX / end) * 100;
    setPercentage(newPercentage); // 更新状态

    // 调用 onChange 回调，将滑块位置传给父组件, 至于父组件拿到这个值干什么就不用管了
    onChange(newPercentage.toFixed(0));
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };


  return (
    <div className='slider-outer' ref={sliderRef}>
      <div className='slider-inner'>
        <span
          className='thumb'
          style={{ left: `calc(${percentage}% - 5px)` }} // <-- 🟡 key point: 根据百分比设置滑块的left位置
          onMouseDown={handleOnMouseDown} // 起于onMouseDown事件，当鼠标按下时开始滑动 (mousedown -> mousemove --> mouseup)
        />
      </div>
    </div>
  );
};
