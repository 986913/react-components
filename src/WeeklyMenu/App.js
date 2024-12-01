import React, { useState } from 'react';
import './index.css';
import { MeunTable } from './MenuTable';
import { ALL_FOOD } from './foodData';

const App = () => {
  const [menuList, setMenuList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  const hanldeClick = () => {
    const randomIndexArr = shuffle();
    setMenuList(randomIndexArr);
  };
  const shuffle = () => {
    let arr = Array.from({ length: ALL_FOOD.length }, (_, idx) => idx);

    // Fisher-yates shuffle:
    for (let i = arr.length - 1; i > 0; i--) {
      const randIdx = Math.floor(Math.random() * (i + 1)); // 在前i+1个元素中随机选择一个
      [arr[i], arr[randIdx]] = [arr[randIdx], arr[i]]; // 交换当前元素和随机元素的位置
    }

    // arr slice here:
    return arr.slice(0, 10);
  };

  return (
    <div className='meunApp'>
      <button id='generateBtn' onClick={hanldeClick}>
        Generate
      </button>
      <MeunTable indexList={menuList} updateActive={(id) => setActiveIdx(id)} />
      <RecipeContent active={activeIdx} />
    </div>
  );
};

const RecipeContent = ({ active }) => {
  if (active === -1) return <div className='receipt-box'> No Content </div>;

  const { recipe } = ALL_FOOD[active];
  return (
    <ul className='receipt-box'>
      {recipe.map((recipe) => (
        <li> - {recipe}</li>
      ))}
    </ul>
  );
};
export default App;
