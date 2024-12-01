import React, { useEffect, useState } from 'react';
import './index.css';
import { ALL_FOOD } from './foodData';
import { MARKETS } from './marketsCategory';

const App = () => {
  const [menuList, setMenuList] = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);

  const [allReceiptList, setAllReceiptList] = useState([]);
  const [costcoList, setCostcoList] = useState([]);
  const [hmartList, setHmartList] = useState([]);
  const [greatwallList, setGreatWallList] = useState([]);
  const [wegmansList, setWegmansList] = useState([]);

  useEffect(() => {
    category(allReceiptList);
  }, [allReceiptList]);

  const hanldeClick = () => {
    const randomIndexArr = shuffle();
    setMenuList(randomIndexArr);
    getAllRecipe();
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
  const getAllRecipe = () => {
    let list = [];
    menuList.forEach((item) => {
      list.push(...ALL_FOOD[item].recipe);
    });
    setAllReceiptList(list);
  };
  const category = (list) => {
    let costo = [];
    let hmart = [];
    let greatwall = [];
    let wegmans = [];

    for (let i = 0; i < list.length; i++) {
      let curr = list[i];
      for (const key in MARKETS) {
        const values = MARKETS[key];
        if (values.indexOf(curr) !== -1) {
          switch (key) {
            case 'Costco':
              costo.push(curr);
              break;
            case 'Hmart':
              hmart.push(curr);
              break;
            case 'Wegmans':
              wegmans.push(curr);
              break;
            case 'GreateWall':
              greatwall.push(curr);
              break;
            default:
              return;
          }
        }
      }
    }

    setCostcoList(costo);
    setGreatWallList(greatwall);
    setWegmansList(wegmans);
    setHmartList(hmart);
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

      {menuList.length > 0 && <button id='recipe-btn'>All Recipe</button>}

      <NeedToBuy
        costcoList={costcoList}
        hmartList={hmartList}
        greatwallList={greatwallList}
        wegmansList={wegmansList}
      />
    </div>
  );
};

/************************************* Chind Components ****************************************/
const MeunTable = ({ indexList, updateActive }) => {
  const handleHoverIn = (e, activeIdx) => {
    const tag = e.target.tagName;
    if (tag === 'TD') {
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
      {recipe.map((recipe, idx) => (
        <li key={Math.random() * idx}> - {recipe}</li>
      ))}
    </ul>
  );
};
const NeedToBuy = ({ wegmansList, costcoList, greatwallList, hmartList }) => {
  return (
    <div className='need-to-buy-container'>
      <ul className='market costo'>
        <h3>Costo</h3>
        {costcoList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <ul className='market greatwall'>
        <h3>Greate Wall</h3>
        {greatwallList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <ul className='market wegmans'>
        <h3>Wegmans</h3>
        {wegmansList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
      <ul className='market hmart'>
        <h3>Hmart</h3>
        {hmartList.map((item) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
