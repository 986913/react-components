import React, {useState} from 'react';
import {Cell} from './Cell';
import './calendar.css';

const WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const MONTHS= ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const DAY_IN_MILLI_SECONDS = 24 * 60 * 60 * 1000; // 24小时*60分钟*60秒*1000毫秒

const getCurrMonth = (date) => date.getMonth();
const getCurrYear = (date) => date.getFullYear();
const getCurrDate = date => date.getDate().toString().padStart(2, "0");
const formatDate = (date) =>  `${getCurrDate(date)}-${MONTHS[getCurrMonth(date)]}-${getCurrYear(date)}`

export const Calendar = ({value=new Date(), onChange}) => {

  //selectedDateNumber用来记录当前用户点击了哪一个日期框框
  const [selectedDateNumber, setSelectedDateNumber] = useState(value.getDate());

  // 根据当前的时间，算出这个月的第一天和最后一天：
  const startDay = new Date(value.getFullYear(), value.getMonth()); 
  const endDay = new Date(value.getFullYear(), value.getMonth()+1, 0);
  // 根据当前的时间，算出这个月有多少天, +1是因为最后一天没算上
  const numDays = Math.ceil((endDay-startDay)/ DAY_IN_MILLI_SECONDS) + 1;
  
  // 前缀添加多少个cell:  第一天星期几
  const prefixDays = startDay.getDay();
  // 后缀添加多少个cell:  6 - 最后一天星期几
  const suffixDays = 6-endDay.getDay();


  const prevMonth = ()=>{
    const currMonth = getCurrMonth(value)
    const newDate = new Date(value.setMonth(currMonth-1));
    onChange(newDate)
  }
  const nextMonth = () => {
    const currMonth = getCurrMonth(value)
    const newDate = new Date(value.setMonth(currMonth+1));
    onChange(newDate)
  }
  const prevYear = () => {
    const currYear = getCurrYear(value)
    const newDate = new Date(value.setFullYear(currYear-1));
    onChange(newDate)
  }
  const nextYear = () => {
    const currYear = getCurrYear(value)
    const newDate = new Date(value.setFullYear(currYear+1));
    onChange(newDate)
  }

  const jumpToToday = () => {
    setSelectedDateNumber(new Date().getDate())
    // call父组件的方法 用来更改日历的当前时间的
    onChange(new Date())
  }

  return (
    <div className='calendar-wrapper'>
      <h2>You selected <span className='selected-date'>{formatDate(new Date(getCurrYear(value), getCurrMonth(value), selectedDateNumber))}</span> </h2>
      <button className='todayBtn' onClick={jumpToToday}>Today</button>

      <div className='calendar-control-panel'>
        <button onClick={prevYear}>{"<<"}</button>
        <button onClick={prevMonth}>{"<"}</button>
        <div> {`${MONTHS[getCurrMonth(value)]} ${getCurrYear(value)}`}</div>
        <button onClick={nextMonth}>{">"}</button>
        <button onClick={nextYear}>{">>"}</button>   
      </div>

      <div className='calendar-display-grid'>
        {/* Render weeks cells */}
        {WEEK.map((day,index) => <Cell key={Math.random()} dateNumber={day} index={index}/>)}

        {/* Render prefix Days cells */}
        {Array(prefixDays).fill(null).map((_, i) => <Cell key={Math.random()}/>)}

        {/* Render current month Days cells */}
        {Array(numDays).fill(null).map((_,index) => <Cell 
          key={Math.random()} 
          index={index} 
          dateNumber={index+1}  
          selected={selectedDateNumber === index+1}
          updateSelectedDateNumber={(dateNumber) => {
            setSelectedDateNumber(dateNumber)
          }} 
        />)}

        {/* Render suffix Days cells */}
        {Array(suffixDays).fill(null).map((_, i) => <Cell key={Math.random()}/>)}
      </div>

    </div>
  )
};
