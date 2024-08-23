import React from 'react';
import { Slider } from './Slider';

export const SliderWrapper = () => (
  <Slider initial={30} onChange={(val) => console.log(`current % is ${val}`)} />
);
