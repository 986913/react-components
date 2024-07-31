import React from 'react';
import { ProgressBarsIIII } from './ProgressBarsIIII';

export const ProgressBarsIIIIWrapper = () => {
  return <ProgressBarsIIII concurrencyLimit={3} duration={2000} />;
};
/* 
  concurrencyLimit ---> 同时running的bars的个数
  duration         ---> run完单独的bar需要的毫秒数
*/
