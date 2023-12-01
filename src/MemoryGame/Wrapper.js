import React from 'react';
import { MemoryGame } from './MemoryGame';

export const MemoryGameWrapper = () => {
  return <MemoryGame rows={4} cols={4} waitTime={3000} matchCount={2} />;
};
