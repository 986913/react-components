import React from 'react';
import { ProgressBarsIIII } from './ProgressBarsIIII';

export const ProgressBarsIIIIWrapper = () => {
  return (
    <div>
      {/* 
          concurrencyLimit ---> 同时running的bars的个数
          duration         ---> run完单独的bar需要的毫秒数
      */}
      <ProgressBarsIIII concurrencyLimit={3} duration={2000} />
    </div>
  );
};
