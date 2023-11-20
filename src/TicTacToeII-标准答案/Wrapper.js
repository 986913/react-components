import React from 'react';
import { TicTacToe } from './TicTacToe';

export const TicTacToeWrapperII = () => {
  // TicTacToe是一个5x5规格, 当4个mark连成一条线时候就win
  return <TicTacToe n={5} m={4} />;
};
