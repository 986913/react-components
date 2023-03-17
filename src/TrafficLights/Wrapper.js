import React from 'react';
import { TrafficLights } from './TrafficLights';

const config = {
  red: {
    duration: 4000,
    next: 'green',
  },
  yellow: {
    duration: 500,
    next: 'red',
  },
  green: {
    duration: 3000,
    next: 'yellow',
  },
};

export const TrafficLightsWrapper = () => {
  return <TrafficLights config={config} initialColor={'green'} />;
};
