import { useEffect, useRef, useState } from 'react';
import { generateMolePositions } from './helper';
import './whack.css';

export const WhackAMole = ({
  rows = 3,
  cols = 3,
  roundDuration = 30,
  molesAtOnce = 1,
  molesAppearingInterval = 1500,
}) => {
  const totalCount = rows * cols;
  const [visible, setVisible] = useState(new Set()); // Set of indices for currently visible moles.
  const [score, setScore] = useState(null); // Current player score.
  const [running, setRunning] = useState(false); // Whether the game is in progress.
  const [timeLeft, setTimeLeft] = useState(roundDuration); // Time left for the current round.
  const countdownTimerId = useRef(null);

  useEffect(() => {
    let timerId;

    if (running) {
      // Generate moles at fixed intervals.
      timerId = setInterval(() => {
        setVisible(generateMolePositions(molesAtOnce, totalCount));
      }, molesAppearingInterval);
    }

    return () => {
      clearInterval(timerId);
      setVisible(new Set());
    };
  }, [running, molesAtOnce, molesAppearingInterval, totalCount]);

  const startGame = () => {
    // Reset variables to default values.
    setRunning(true);
    setTimeLeft(roundDuration);
    setScore(0);

    // Interval to decrement the timer to 0.
    countdownTimerId.current = setInterval(() => {
      setTimeLeft((currTimeLeft) => {
        if (currTimeLeft <= 0) {
          clearInterval(countdownTimerId.current);
          setRunning(false);
          return 0;
        }
        return currTimeLeft - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      // Clear countdown timer on unmount if it's running.
      clearInterval(countdownTimerId.current);
    };
  }, []);

  const whackMole = (index) => {
    // Whacking on an empty cell, no-op.
    if (!visible.has(index)) return;

    const newVisible = new Set(visible);
    newVisible.delete(index); // --> 打到地鼠后，地鼠要立马消失。。

    setVisible(newVisible);
    setScore((score ?? 0) + 1);
  };

  return (
    <div className='whack-app'>
      <div className='header'>
        {score == null ? (
          <button className='start-button' type='button' onClick={startGame}>
            Start Game
          </button>
        ) : (
          <div className='round-information'>
            <p>Score: {score}</p>
            {!running && (
              <button
                className='start-button'
                type='button'
                onClick={startGame}
              >
                Play again
              </button>
            )}
            <p>Time Left: {timeLeft}</p>
          </div>
        )}
      </div>

      <div
        className='grid'
        style={{
          gridTemplateColumns: `repeat(${rows}, 1fr)`,
          gridTemplateRows: `repeat(${cols}, 1fr)`,
        }}
      >
        {Array(totalCount)
          .fill(null)
          .map((_, index) => {
            return (
              <button
                className='grid__cell'
                key={index}
                onClick={() => whackMole(index)}
              >
                <img
                  src='https://www.greatfrontend.com/img/questions/whack-a-mole/mole-head.png'
                  alt='Mole head'
                  className={[
                    'grid__cell-contents',
                    'mole-head',
                    visible.has(index) && 'mole-head--visible',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
                <img
                  src='https://www.greatfrontend.com/img/questions/whack-a-mole/mole-hill.png'
                  alt='Mole hill'
                  className='grid__cell-contents mole-hill'
                />
              </button>
            );
          })}
      </div>
    </div>
  );
};
