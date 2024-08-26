import React from 'react';
import './poll.css';
import { useState } from 'react';


export const Poll = ({ header, initData, onChange }) => {
  const [list, setList] = useState(initData);
  const [prevSelectedID, setPrevSelectedID] = useState();
  const [isVoted, setIsVoted] = useState(false);

  const handleClick = (item) => {
    const newList = list.map((n) => {
      if (n.id === prevSelectedID) n.voteRate -= 10;
      if (n.id === item.id){
        n.voteRate += 10;
        onChange(item);
      }
      return n; //不要忘了return
    });

    setIsVoted(true);
    setList(newList);
    setPrevSelectedID(item.id);
  };

  return (
    <div className='poll-container'>
      <h3>{header}</h3>
      <ul>
        {list.map((item) => {
          const { voteRate, id, title } = item;
          return (
            <li className='item' 
                key={id} 
                onClick={() => handleClick(item)}
            >
              {title}
              <div className='progress-poll' style={{ width: isVoted ? `${voteRate}%` : `0%` }}/>
              {isVoted && <span className='rateText'> {`${voteRate}%`} </span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
