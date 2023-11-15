import React, { useState } from 'react';
import './tic.css';

export const TicTacToe = () => {
  const [mx, setMX] = useState(
    Array(3)
      .fill('')
      .map((_) => Array(3).fill(''))
  ); // mx is 3x3 grid, stand for board looks
  const [player, setPlayer] = useState(1); // 1 stand for X,  -1 stand for O;
  const [winner, setWinner] = useState(''); // winner is '', X or O
  const [isDraw, setIsDraw] = useState(false);

  let [count, setCount] = useState(0); //记录走了多少步。。主要用于下面的draw case

  const handleOnClick = (e, rowIndex, colIndex) => {
    if (winner) return;
    if (mx[rowIndex][colIndex] !== '' && count > 0) return;

    setCount((count += 1)); // update count
    setPlayer(player * -1); // swithc player here
    const newMx = [...mx];
    newMx[rowIndex][colIndex] = player === 1 ? 'X' : 'O';
    setMX(newMx);

    checkIfWins();
  };

  const checkIfWins = () => {
    // check row
    for (let i = 0; i < 3; i++) {
      const [a, b, c] = mx[i];
      if (a && a === b && b === c) {
        setWinner(a);
        return;
      }
    }
    // check column
    for (let j = 0; j < 3; j++) {
      const [a, b, c] = [mx[0][j], mx[1][j], mx[2][j]];
      if (a && a === b && b === c) {
        setWinner(a);
        return;
      }
    }
    // check两个对角线
    const [a, b, c] = [mx[0][0], mx[1][1], mx[2][2]];
    if (a && a === b && b === c) {
      setWinner(a);
      return;
    }
    const [d, e, f] = [mx[0][2], mx[1][1], mx[2][0]];
    if (d && d === e && e === f) {
      setWinner(d);
      return;
    }

    // Draw case;
    if (count === 9 && !winner) setIsDraw(true);
  };

  const handleReset = () => {
    setPlayer(1);
    setWinner('');
    setIsDraw(false);
    setCount(0);
    setMX(
      Array(3)
        .fill('')
        .map((_) => Array(3).fill(''))
    );
  };

  return (
    <div className='tic-container'>
      {winner && <p className='win-msg'> Player {winner} wins !</p>}
      {isDraw && <p>It's draw !</p>}
      {!winner && !isDraw && <p>Player {player === 1 ? 'X' : 'O'} turn </p>}

      <section className='board'>
        {mx.map((row, i) => {
          return row.map((_, j) => {
            return (
              <div
                className='cell'
                key={`${i}-${j}`}
                onClick={(e) => handleOnClick(e, i, j)}
              >
                {mx[i][j]}
              </div>
            );
          });
        })}
      </section>

      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

/*****************************  Leetcode 1275(模拟题) 不牵扯React *****************************/
