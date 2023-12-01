import React from 'react';
import { WhackAMole } from './WhackAMole';

export const WhackAMoleWrapper = () => (
  <WhackAMole
    rows={3}
    cols={3}
    roundDuration={15}
    molesAtOnce={2}
    molesAppearingInterval={1500}
  />
);
