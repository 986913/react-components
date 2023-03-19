import React from 'react';
import './calculator.css';
import { useState } from 'react';

const Input = ({ children }) => <section id='display'>{children}</section>;

const Button = ({ children, handleClick }) => {
  const isOperator = isNaN(children) && children !== '.';
  const isEqualSign = children === '=';
  const styles = () => {
    if (isEqualSign) return 'equal';
    if (isOperator) return 'operator';
  };
  const hanldeOnClick = () => {
    handleClick(children); // handleClick is a callback
  };
  return (
    <button className={styles()} onClick={hanldeOnClick}>
      {children}
    </button>
  );
};

const ClearButton = ({ children, handleClick }) => (
  <button onClick={() => handleClick()}>{children}</button>
);

export const Calculator = () => {
  const [input, setInput] = useState(''); // current result
  const [prevNum, setPrevNum] = useState(0); // prev result
  const [operator, setOperator] = useState('');

  const addToInput = (val) => setInput(input + val);

  const addZeroToInput = (val) => {
    if (input) setInput(input + val);
  };

  const addDecimal = (val) => {
    if (input.indexOf('.') === -1) {
      setInput(input + val);
    }
  };

  const clearVal = () => setInput('');

  const add = () => {
    // store the prevNum:
    setPrevNum(input);
    // update input display
    setInput('');
    // update operator
    setOperator('plus');
  };
  const miuns = () => {
    setPrevNum(input);
    setInput('');
    setOperator('miuns');
  };
  const multiple = () => {
    setPrevNum(input);
    setInput('');
    setOperator('multiple');
  };
  const divide = () => {
    setPrevNum(input);
    setInput('');
    setOperator('divide');
  };

  const calculate = () => {
    switch (operator) {
      case 'plus':
        setInput(parseFloat(prevNum) + parseFloat(input));
        break;
      case 'miuns':
        setInput(parseFloat(prevNum) - parseFloat(input));
        break;
      case 'multiple':
        setInput(parseFloat(prevNum) * parseFloat(input));
        break;
      case 'divide':
        setInput(parseFloat(prevNum) / parseFloat(input));
        break;
      default:
        return;
    }
  };

  return (
    <div className='App'>
      <Input>{input}</Input>

      <section id='board'>
        <Button handleClick={add}>+</Button>
        <Button handleClick={miuns}>-</Button>
        <Button handleClick={multiple}>x</Button>
        <Button handleClick={divide}>/</Button>
        <Button handleClick={addToInput}>7</Button>
        <Button handleClick={addToInput}>8</Button>
        <Button handleClick={addToInput}>9</Button>
        <Button handleClick={addToInput}>4</Button>
        <Button handleClick={addToInput}>5</Button>
        <Button handleClick={addToInput}>6</Button>
        <Button handleClick={addToInput}>1</Button>
        <Button handleClick={addToInput}>2</Button>
        <Button handleClick={addToInput}>3</Button>
        <Button handleClick={addZeroToInput}>0</Button>
        <Button handleClick={addDecimal}>.</Button>
        <Button handleClick={calculate}>=</Button>
        <ClearButton handleClick={clearVal}>AC</ClearButton>
      </section>
    </div>
  );
};
