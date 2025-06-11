import { useState } from 'react';
import './index.css';

const cToF = (celsius) => (celsius * 1.8 + 32).toFixed(4);
const fToC = (fahrenheit) => ((fahrenheit - 32) / 1.8).toFixed(4);
const isNumber = (char) => new RegExp(/[0-9]/).test(char);

export const TemperatureConverter = () => {
  const [celsiusVal, setCelsiusVal] = useState('');
  const [fahrenheitVal, setFahrenheitVal] = useState('');

  const handleCelsiusChange = (e) => {
    const newVal = e.target.value;
    setCelsiusVal(newVal);
    setFahrenheitVal(newVal === '' ? '' : cToF(newVal));
  };
  const handleFahrenheitChange = (e) => {
    const newVal = e.target.value;
    setFahrenheitVal(newVal);
    setCelsiusVal(newVal === '' ? '' : fToC(newVal));
  };
  const handleKeyDown = (e) => {
    const key = e.key;
    if (!isNumber(key) && key !== '.') {
      e.preventDefault();
      setCelsiusVal('');
      setFahrenheitVal('');
    }
  };

  return (
    <>
      <div className='convertor'>
        <div>
          <input
            id='celsius'
            type='number'
            value={celsiusVal}
            onChange={handleCelsiusChange}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor='celsius'>Celsius</label>
        </div>
        <span> = </span>
        <div>
          <input
            id='fahrenheit'
            type='number'
            value={fahrenheitVal}
            onChange={handleFahrenheitChange}
            onKeyDown={handleKeyDown}
          />
          <label htmlFor='fahrenheit'>Fahrenheit</label>
        </div>
      </div>
    </>
  );
};
