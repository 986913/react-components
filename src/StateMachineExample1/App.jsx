import React, {useState} from 'react';
import "./app.css";

export const App = () => {
  const [status, setStatus] = useState('success');
  const [leftValue, setLeftValue] = useState(0);

  const handleToggle = () => setStatus((prevStatus)=> prevStatus==='success' ? 'loading': 'success');
  const moveSquare = () => setLeftValue((prevVal)=> prevVal + 30)

  return (
     /* 重点1在这：🟡 给jsx元素设置属性： data-任意名={动态state值},  可以在css中使用属性选择器给选到 */
    <div className='stateMachine' data-status={status}>
      <button onClick={handleToggle}> toggle background opacity </button>

      <br/>
      <button onClick={moveSquare}> click to move below square </button>
      <div 
        className='square' 
        style={{'--myLeft': leftValue}}  /* 重点2在这：🟡 style={{ '--自定义css属性': 动态值 }}   */
      />
    </div>
  )
};
