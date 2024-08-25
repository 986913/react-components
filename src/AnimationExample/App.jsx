import React from 'react';
import './appp.css'

export const App = () => {
  return (
    <>
      { Array.from({length: 5}).map((_, idx)=> <div className='ball' key={idx} style={{'--myIdx': idx}}></div>)}
    </>
  )

}