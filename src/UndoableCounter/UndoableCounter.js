import React, { useState } from 'react';
import './counter.css';
import { UndoableCounterHistory } from './UndoableCounterHistory';

const OPERATIONS = {
  '/2': { type: 'divide', val: 2 },
  '-1': { type: 'decrement', val: 1 },
  '+1': { type: 'increment', val: 1 },
  x2: { type: 'multiply', val: 2 },
};
const performOperation = (counter, operationLabel) => {
  const operation = OPERATIONS[operationLabel];
  switch (operation.type) {
    case 'increment':
      return counter + operation.val;
    case 'decrement':
      return counter - operation.val;
    case 'multiply':
      return counter * operation.val;
    case 'divide':
      return counter / operation.val;
    default:
      return counter;
  }
};

export const UndoableCounter = () => {
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [undoHistory, setUndoHistory] = useState([]);

  const onReset = () => {
    setCounter(0);
    setHistory([]);
    setUndoHistory([]);
  };

  const onUndo = () => {
    const [latest, ...earlierHistory] = history;

    setCounter(latest.oldCounter);
    setUndoHistory([latest, ...undoHistory]);
    setHistory(earlierHistory);
  };

  const onRedo = () => {
    const [latest, ...earlierUndoHistory] = undoHistory;

    setCounter(latest.newCounter);
    setUndoHistory(earlierUndoHistory);
    setHistory([latest, ...history]);
  };

  const onClickOperation = (operation) => {
    const oldCounter = counter;
    const newCounter = performOperation(counter, operation);

    setCounter(newCounter);
    setHistory([{ operation, oldCounter, newCounter }, ...history]);
    setUndoHistory([]);
  };

  return (
    <div>
      <div className='counter-row'>
        <button disabled={history.length === 0} onClick={onUndo}>
          Undo
        </button>
        <button disabled={undoHistory.length === 0} onClick={onRedo}>
          Redo
        </button>
        <button onClick={onReset}>Reset</button>
      </div>

      <hr />
      <div className='counter-row'>
        <button onClick={() => onClickOperation('/2')}>/2</button>
        <button onClick={() => onClickOperation('-1')}>-1</button>
        <div className='counter-label'>{counter}</div>
        <button onClick={() => onClickOperation('+1')}>+1</button>
        <button onClick={() => onClickOperation('x2')}>x2</button>
      </div>

      <hr />
      <div className='counter-row'>
        <UndoableCounterHistory history={history} />
      </div>
    </div>
  );
};
