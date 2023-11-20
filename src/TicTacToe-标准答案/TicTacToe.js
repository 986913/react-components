import React, { useState } from 'react';
import { Cell } from './Cell';
import { determineWinner } from './helper';
import './tic.css';

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null)); // 'X', 'O', or null, representing the marks made by players X, O, or an empty cell
  const [xIsPlaying, setIsXPlaying] = useState(true);

  const winner = determineWinner(board);

  const onReset = () => {
    setBoard(Array(9).fill(null));
    setIsXPlaying(true);
  };

  const getStatusMessage = () => {
    if (winner != null) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`; // All cells have been filled up.
    return `Player ${xIsPlaying ? 'X' : 'O'} turn`;
  };

  const handleOnClick = (cellIndex, player) => {
    const newBoard = board.slice();
    newBoard[cellIndex] = player;

    // update board and player here:
    setBoard(newBoard);
    setIsXPlaying(!xIsPlaying);
  };

  const handleOnBtnClick = () => {
    if (winner == null) {
      // Confirm whether to reset the game.
      const confirm = window.confirm(
        'Are you sure you want to reset the game?'
      );
      if (!confirm) return;
    }
    //if has winner, then reset directly,
    onReset();
  };

  return (
    <div className='tic-app'>
      <div aria-live='polite'>{getStatusMessage()}</div>

      <div className='board'>
        {board.map((_, index) => {
          const player = xIsPlaying ? 'X' : 'O';
          return (
            <Cell
              key={index}
              index={index}
              mark={board[index]} // mark实际用于显示每个cell里头的内容： X O 或者 空
              disabled={board[index] != null || winner != null}
              player={player}
              onClick={() => handleOnClick(index, player)}
            />
          );
        })}
      </div>

      <button onClick={handleOnBtnClick}>Reset</button>
    </div>
  );
};
