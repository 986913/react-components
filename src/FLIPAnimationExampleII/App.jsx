import React, {useState} from 'react';
import { Flip } from './FLIP';
import "./app.css";

export const App = () => {  
  const [list, setList] = useState([1, 2, 3, 4, 5])

  /* Math.random() 会生成一个介于 0 和 1 之间的随机数。当你减去 0.5 时，你将得到一个介于 -0.5 和 0.5 之间的随机数。这个随机数可以是正数、负数或零。
    通过使用 Math.random() - 0.5，你使得比较函数有一半的概率返回正数（表示顺序不变），一半的概率返回负数（表示顺序交换），从而实现对数组元素的随机排序 */
  const shuffle = () => setList([...list.sort(() => Math.random() - 0.5)])


  return (
    <>
      <div className='boxcontainer'>
        <Flip>
          {list.map(item => <div className='box' key={item}> {item} </div>)}
        </Flip>
      </div>
      <button onClick={shuffle}>打乱</button>
    </>
  )
};
