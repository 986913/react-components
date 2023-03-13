import React from 'react';
import { ProgressBarsIII } from './ProgressBarsIII';

export const ProgressBarsIIIWrapper = () => {
  return (
    <div>
      <ProgressBarsIII concurrencyLimit={3} />
    </div>
  );
};
