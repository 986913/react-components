import React from 'react';
import { Slider } from './Slider';

export const SliderWrapper = () => (
  <Slider initial={80} onChange={(val) => console.log(val)} />
);
