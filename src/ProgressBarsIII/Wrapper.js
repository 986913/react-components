import React from 'react';
import { ProgressBarsIII } from './ProgressBarsIII';

export const ProgressBarsIIIWrapper = () => {
  return (
    <div>
      {/*  concurrencyLimit ---> 同时running的bars的个数 */}
      <ProgressBarsIII concurrencyLimit={3} />
    </div>
  );
};
