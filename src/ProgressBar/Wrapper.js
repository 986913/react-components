import React from 'react';
import { ProgressBar } from './ProgressBar';

export const ProgressBarWrapper = () => {
  return (
    <div>
      <ProgressBar value={-20} />
      <ProgressBar value={0} />
      <ProgressBar value={30} />
      <ProgressBar value={50} />
      <ProgressBar value={100} />
      <ProgressBar value={110} />
    </div>
  );
};
