import React, { useState } from 'react';
import { Calendar } from './Calendar';

export const CalendarWrapper = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // onChange在Calender组件内被触发, 用来更改日历的当前时间的
  const handleOnChange = (newDate) => setCurrentDate(newDate);

  return <Calendar value={currentDate} onChange={handleOnChange} />;
};
