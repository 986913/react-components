import React, { useCallback, useEffect, useState } from 'react';
import './index.css';
import { ALL_FOOD } from './foodData';
import { MARKETS } from './marketsCategory';

const App = () => {
  const [menuList, setMenuList] = useState([]);

  const [allReceiptList, setAllReceiptList] = useState([]);
  const [costcoList, setCostcoList] = useState([]);
  const [hmartList, setHmartList] = useState([]);
  const [greatwallList, setGreatWallList] = useState([]);
  const [wegmansList, setWegmansList] = useState([]);

  const generateMeun = () => {
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

  const getAllRecipe = useCallback(() => {
    // let list = [];
    // menuList.forEach((item) => {
    //   list.push(...ALL_FOOD[item].recipe);
    // });
    // setAllReceiptList(list);
    const newAllReceiptList = menuList
      .map((item) => ALL_FOOD[item].recipe)
      .flat();
    setAllReceiptList(newAllReceiptList);
  }, [menuList]);

  useEffect(() => {
    if (menuList.length > 0) getAllRecipe();
  }, [menuList, getAllRecipe]);

  useEffect(() => {
    category(allReceiptList);
  }, [allReceiptList]);

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
    <div className='all-box'>
      <div className='meun-app-container'>
        <div className='meunApp'>
          <button id='generateBtn' onClick={generateMeun}>
            点击生成菜单
          </button>
          <MeunTable indexList={menuList} />
          {/* <RecipeContent active={activeIdx} /> */}
        </div>

        {menuList.length > 0 && <button id='recipe-btn'>All Recipe</button>}

        <NeedToBuy
          costcoList={costcoList}
          hmartList={hmartList}
          greatwallList={greatwallList}
          wegmansList={wegmansList}
        />
      </div>
      <div className='right-box'>
        {menuList.length > 0 && <RecipeContentDisplay menuList={menuList} />}
      </div>
    </div>
  );
};
export default App;

/************************************* Chind Components ****************************************/
const MeunTable = ({ indexList }) => {
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
                  <td>
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
                  <td>
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

const RecipeContentDisplay = ({ menuList }) => {
  return (
    <>
      <ul>
        {menuList.map((item, idx) => {
          const { name, recipe } = ALL_FOOD[item];
          return (
            <li key={Math.random() * idx}>
              <strong>{name}</strong>
              <br />
              {recipe.sort().map((each, index) => (
                <span key={Math.random() * index}>{each}, </span>
              ))}
            </li>
          );
        })}
      </ul>
    </>
  );
};

const NeedToBuy = ({ wegmansList, costcoList, greatwallList, hmartList }) => {
  return (
    <div className='need-to-buy-container'>
      <ul className='market costo'>
        <h3>Costco</h3>
        {formatUtil(costcoList).map((item, idx) => (
          <li key={Math.random() * idx}>{item}</li>
        ))}
      </ul>
      <ul className='market greatwall'>
        <h3>Great Wall</h3>
        {formatUtil(greatwallList).map((item, idx) => (
          <li key={Math.random() * idx}>{item}</li>
        ))}
      </ul>
      <ul className='market wegmans'>
        <h3>Wegmans</h3>
        {formatUtil(wegmansList).map((item, idx) => (
          <li key={Math.random() * idx}>{item}</li>
        ))}
      </ul>
      <ul className='market hmart'>
        <h3>Hmart</h3>
        {hmartList.map((item, idx) => (
          <li key={Math.random() * idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

/************************************* Helper functions ****************************************/
const formatUtil = (arr) => {
  arr.sort();
  let newArr = [];
  let count = 1;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      count++;
    } else {
      if (count > 1) newArr.push(`${arr[i]} X${count}`);
      else newArr.push(arr[i]);
      count = 1; //reset count
    }
  }
  return newArr;
};
