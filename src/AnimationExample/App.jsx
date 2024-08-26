import React from 'react';
import './appp.css'

export const App = () => {
  return (
    <>
      {/* 重点在这：🟡  style={{ '--自定义css属性': 动态值 }}   */}
      { Array.from({length: 5}).map((_, idx)=> <div className='ball' key={idx} style={{'--myIdx': idx}}></div>)}
    </>
  )

}