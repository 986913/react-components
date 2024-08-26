import React from 'react';
import './poll.css';
import { useState } from 'react';

/**
 *
 * Poll component:
 *    props: header, list(按道理是props，本地用于做demo就写成state便于data操作)
 *    state: list, prevSelected, isVoted
 */

export const Poll = ({ header, initData }) => {
  const [list, setList] = useState(initData);
  const [prevSelected, setPrevSelected] = useState();
  const [isVoted, setIsVoted] = useState(false);

  const handleClick = (item) => {
    const newList = list.map((n) => {
      if (n.id === prevSelected) n.voteRate -= 10;
      if (n.id === item.id) n.voteRate += 10;
      return n;
    });
    setIsVoted(true);
    setList(newList);
    setPrevSelected(item.id);
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
