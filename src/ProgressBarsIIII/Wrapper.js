import React from 'react';
import { ProgressBarsIIII } from './ProgressBarsIIII';

export const ProgressBarsIIIIWrapper = () => {
  return (
    <div>
      <ProgressBarsIIII concurrencyLimit={3} />
    </div>
  );
};
