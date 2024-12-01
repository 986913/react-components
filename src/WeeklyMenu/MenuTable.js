import React from 'react';
import { ALL_FOOD } from './foodData';

export const MeunTable = ({ indexList, updateActive }) => {
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
            <th>Launch</th>
            <th>Dinner</th>
          </tr>
        </thead>
        <tbody>
          {indexList.map((_, idx) => {
            if (idx % 2 === 0) {
              const lunch = ALL_FOOD[indexList[idx]];
              const dinner = ALL_FOOD[indexList[idx + 1]] || { name: 'N/A' };

              return (
                <tr key={Math.random() * idx}>
                  <th>Day {Math.floor(idx / 2) + 1} </th>
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
