import React, {useRef} from 'react';
import "./app.css";


export const App = () => {
  /*
    const squareRef = useRef();
    const move = () => {
      if(squareRef.current){
        const square = squareRef.current;

        // 通过其他方式使它移动到正确位置, 在FLIP中，有可能是元素的位置被调整了之类的，具体怎么调整不重要
        square.style.marginLeft = '100px';
        // 设置 “反向” 的偏移
        square.style.transform = 'translateX(-100px)';

        requestAnimationFrame(()=>{
          // 此时，再给元素加上过渡
          square.style.transition = 'transform 1s';
          // 然后移除掉偏移，让元素 “归位”
          square.style.transform = ''
        },0)
      } 
    };
  */


  const square2Ref = useRef();
  const changeDOM = () => {
    // 生成一个 div
    const newDiv = document.createElement('div')
    // 宽度在0~200px之间随机
    newDiv.style.width = `${Math.floor(Math.random() * 200)}px`
    newDiv.style.border = '2px dashed grey'
    // 放入容器中
    document.getElementById('containeer').prepend(newDiv)
  };
  //使得蓝色的div元素实现 FLIP 动画
  const clickButton = () => {
    const element =  square2Ref?.current;
    if(element){
      /* 1. First: 记录蓝色方块的起始位置, */
      const start = element.getBoundingClientRect();
      changeDOM();
      /* 2. Last:  记录蓝色方块的终点位置 */
      const end = element.getBoundingClientRect();
      /* 3. Invert: 计算“反向”偏移量 */
      const deltaX = start.left - end.left;
      const deltaY = start.top - end.top;
      // 重置动画属性
      element.style.transition = '';
      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      /* 4. Play: 播放动画应用变换  */
      requestAnimationFrame(()=>{
        element.style.transition = 'transform 1s';
        element.style.transform = '';
      })
    }
  };

  return (
    <>
      {/* 
        <div
            ref={squareRef} 
            style={{width:'100px', height:'100px', backgroundColor:'blue'}}
        />
        <button onClick={move}>移动</button> 
      */}

      <br/> <br/>

      <div id="containeer">
        <div ref={square2Ref} style={{width: '100px', backgroundColor: 'skyblue', opacity: 0.8}}/>
      </div>
      <button onClick={clickButton} style={{ marginTop: '10px'}}>随机插入元素</button>
    </>
  )
};
