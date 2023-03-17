import { useState, useEffect } from 'react';
import './tranficlights.css';

const Light = ({ color }) => (
  <div
    className='light'
    aria-hidden={true}
    style={{ backgroundColor: color }}
  ></div>
);

export const TrafficLights = ({ config, initialColor = 'green' }) => {
  const [currColor, setCurrColor] = useState(initialColor);

  useEffect(() => {
    const { duration, next } = config[currColor];
    const timer = setTimeout(() => {
      setCurrColor(next);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [currColor]);

  return (
    <div
      className='lights-wrapper'
      aria-live='polite'
      aria-label={`Current light: ${currColor}`}
    >
      {Object.keys(config).map((color) => {
        return (
          <Light
            color={color === currColor ? currColor : undefined}
            key={color}
          />
        );
      })}
    </div>
  );
};

/**
 * 知识点：
 * 1. 要在config里做好灯的顺序，间隔等配置，别在react里头做..
 * 2. Object.keys()的使用
 * 3. useEffect return function is for cleanup, usually clearTimeout or clearInterval there
 */
