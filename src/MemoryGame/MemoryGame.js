import React, { useState, useCallback, useEffect, useRef } from 'react';
import './memorygame.css';
import { generateCards } from './helper';

export const MemoryGame = ({
  cols = 4,
  rows = 4,
  delay = 2000,
  matchCount = 2,
}) => {
  const totalCount = rows * cols; // Total number of cells.
  const [cards, setCards] = useState(generateCards(totalCount, matchCount)); // An array of emojis to represent the cards.
  const [flipped, setFlipped] = useState([]); // Currently flipped cards.
  const [matched, setMatched] = useState(new Set()); // Identifier of matched cards.
  const waitTimer = useRef(null); // Delay before cards are flipped back.
  const [gameCompleted, setGameCompleted] = useState(false); // Whether the game has completed.

  const resetGame = useCallback(() => {
    waitTimer.current = null;
    setCards(generateCards(totalCount, matchCount));
    setFlipped([]);
    setMatched(new Set());
    setGameCompleted(false);
  }, [matchCount, totalCount]);

  useEffect(() => {
    resetGame();
  }, [cols, rows, matchCount, resetGame]);

  if (matchCount < 2) throw new Error(`${matchCount} should be 2 or more`);
  if (totalCount % matchCount !== 0) {
    throw new Error(
      `Cannot divide total cells of ${totalCount} by ${matchCount}`
    );
  }

  const onFlip = (index) => {
    let currFlipped = flipped;

    // Player flips more cards while there are unmatched cards flipped open.
    if (waitTimer.current != null) {
      clearTimeout(waitTimer.current);
      waitTimer.current = null;
      currFlipped = [];
    }

    const newflipped = [...currFlipped, index];
    setFlipped(newflipped);

    // Not enough cards are flipped.
    if (newflipped.length < matchCount) return;

    const allFlippedAreSame = newflipped.every(
      (index) => cards[newflipped[0]] === cards[index]
    );

    if (allFlippedAreSame) {
      const newMatchedSet = new Set(matched);
      newMatchedSet.add(cards[newflipped[0]]);
      setMatched(newMatchedSet);
      setFlipped([]);

      if (newMatchedSet.size * matchCount === totalCount) {
        setGameCompleted(true);
      }

      return;
    }

    const timer = setTimeout(() => {
      // After a delay if no new cards were flipped, flip all cards back.
      setFlipped([]);
      waitTimer.current = null;
    }, delay);

    waitTimer.current = timer;
  };

  return (
    <div className='memory-app'>
      <div
        className='memory-grid'
        style={{
          gridTemplateRows: `repeat(${rows}, var(--size))`,
          gridTemplateColumns: `repeat(${cols}, var(--size))`,
        }}
      >
        {cards.map((card, index) => {
          const isMatched = matched.has(cards[index]);
          const isFlipped = flipped.includes(index);

          return (
            <button
              key={index}
              className={[
                'memory-card',
                matched.has(cards[index]) && 'card--revealed',
              ]
                .filter(Boolean)
                .join(' ')}
              disabled={isMatched || isFlipped}
              onClick={() => {
                onFlip(index);
              }}
            >
              {(isMatched || isFlipped) && card}
            </button>
          );
        })}
      </div>

      {gameCompleted && <button onClick={resetGame}>Play Again</button>}
    </div>
  );
};
