import React, { useState, useCallback, useEffect } from 'react';
import { Cell } from './Cell';
import { determineWinner } from './helper';
import './tictactoeII.css';

/**
  这是TicTacToe的升级版本：
    之前经典的TicTacToe是3 x 3;
    现在升级版是 N x N, needs M marks in a horizontal, vertical, or diagonal row to win. (N=5, M=4 as example)
 **/

export const TicTacToe = ({ n, m }) => {
  const [board, setBoard] = useState(Array(n * n).fill(null)); // difference is here
  const [xIsPlaying, setIsXPlaying] = useState(true);
  const [winner, setWinner] = useState(null); // difference is heres

  const onReset = useCallback(() => {
    setBoard(Array(n * n).fill(null));
    setIsXPlaying(true);
    setWinner(null);
  }, [n]);

  // difference is here
  useEffect(() => {
    onReset();
  }, [n, m, onReset]);

  // difference is here
  if (m > n) throw Error('Invalid props. `m` must be <= `n`.');

  const getStatusMessage = () => {
    if (winner != null) return `Player ${winner} wins!`;
    if (!board.includes(null)) return `It's a draw!`;
    return `Player ${xIsPlaying ? 'X' : 'O'} turn`;
  };

  const handleOnClick = (cellIndex, player) => {
    const newBoard = board.slice();
    newBoard[cellIndex] = player;

    setBoard(newBoard);
    setIsXPlaying(!xIsPlaying);
    setWinner(determineWinner(newBoard, cellIndex, n, m)); // different is here
  };

  const handleOnBtnClick = () => {
    if (winner == null) {
      const confirm = window.confirm(
        'Are you sure you want to reset the game?'
      );
      if (!confirm) return;
    }
    onReset();
  };

  return (
    <div className='tic-app'>
      <div aria-live='polite'>{getStatusMessage()}</div>

      <div
        className='boardII'
        // different is here:
        style={{
          gridTemplateColumns: `repeat(${n}, 1fr)`,
        }}
      >
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
