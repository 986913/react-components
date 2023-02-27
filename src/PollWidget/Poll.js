import React from 'react';
import './poll.css';
import { useState } from 'react';
const mockApidata = [
  { title: 'React', voteRate: 60, id: 1 },
  { title: 'Vue', voteRate: 30, id: 2 },
  { title: 'Angular', voteRate: 10, id: 3 },
];

/**
 *
 * Poll component:
 *    props: header, list(按道理是props，本地用于做demo就写成state便于data操作)
 *    state: list, prevSelected, isVoted
 */
export const Poll = ({ header }) => {
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

  const [list, setList] = useState(mockApidata);
  const [prevSelected, setPrevSelected] = useState();
  const [isVoted, setIsVoted] = useState(false);

  return (
    <div className='container'>
      <h3>{header}</h3>
      <ul>
        {list.map((item) => {
          const { voteRate, id, title } = item;
          const progressStyle = { width: isVoted ? `${voteRate}%` : `0%` };
          return (
            <li className='item' key={id} onClick={() => handleClick(item)}>
              {title}
              <div className='progress-poll' style={progressStyle}></div>
              {isVoted && <span className='rateText'>{`${voteRate}%`}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
