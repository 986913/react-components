import React from 'react';
import { Slider } from './Slider';

export const SliderWrapper = () => (
  <Slider initial={10} max={100} onChange={(val) => console.log(val)} />
);
