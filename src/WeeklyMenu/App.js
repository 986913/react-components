import React, { useState } from 'react';
import './index.css';
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
    <div className='meun-app-container'>
      <div className='meunApp'>
        <button id='generateBtn' onClick={hanldeClick}>
          Generate
        </button>
        <MeunTable
          indexList={menuList}
          updateActive={(id) => setActiveIdx(id)}
        />
        <RecipeContent active={activeIdx} />
      </div>

      <button id='recipe-btn'> Get All Recipe </button>
    </div>
  );
};

/************************************* Chind Components ****************************************/
const MeunTable = ({ indexList, updateActive }) => {
  const handleHoverIn = (e, activeIdx) => {
    const tag = e.target.tagName;
    if (tag === 'TD') {
      console.log(activeIdx);
      updateActive(activeIdx);
    }
  };
  const handleHoverOut = (e) => {
    const tag = e.target.tagName;
    if (tag === 'TD') {
      updateActive(-1);
    }
  };
  // console.log(indexList);
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Days</th>
            <th>午饭</th>
            <th>晚饭</th>
          </tr>
        </thead>
        <tbody>
          {indexList.map((_, idx) => {
            if (idx % 2 === 0) {
              const lunch = ALL_FOOD[indexList[idx]];
              const dinner = ALL_FOOD[indexList[idx + 1]] || { name: 'N/A' };

              return (
                <tr key={Math.random() * idx}>
                  <th> 星期{Math.floor(idx / 2) + 1} </th>
                  <td
                    onMouseEnter={(e) => handleHoverIn(e, indexList[idx])}
                    onMouseLeave={(e) => handleHoverOut(e)}
                  >
                    {lunch.src ? (
                      <a
                        href={lunch.src}
                        target='_blank'
                        id='link'
                        rel='noreferrer'
                      >
                        {lunch.name}
                      </a>
                    ) : (
                      <span>{lunch.name}</span>
                    )}
                  </td>
                  <td
                    onMouseEnter={(e) => handleHoverIn(e, indexList[idx + 1])}
                    onMouseLeave={(e) => handleHoverOut(e)}
                  >
                    {dinner.src ? (
                      <a
                        href={dinner.src}
                        target='_blank'
                        id='link'
                        rel='noreferrer'
                      >
                        {dinner.name}
                      </a>
                    ) : (
                      <span>{dinner.name}</span>
                    )}
                  </td>
                </tr>
              );
            } else return null;
          })}
        </tbody>
      </table>
    </>
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
