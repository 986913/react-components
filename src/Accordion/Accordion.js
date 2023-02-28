import React, { useState } from 'react';
import './accordion.css';

export const Accordion = ({ sections }) => {
  const [openSections, setOpenSections] = useState(new Set()); // <--- state用Set来装当前打开的section

  const handleClick = (value) => {
    const newOpenSections = new Set(openSections);
    newOpenSections.has(value)
      ? newOpenSections.delete(value)
      : newOpenSections.add(value);

    // console.log(newOpenSections);
    setOpenSections(newOpenSections);
  };

  return (
    <div className='accordion'>
      {sections.map(({ value, title, contents }) => {
        const isExpanded = openSections.has(value); // <--- key point, construct isExpaned here,

        return (
          <div className='accordion-item' key={value}>
            <button
              className='accordion-item-title'
              type='button'
              onClick={() => handleClick(value)}
            >
              {title}
              <span
                aria-hidden={true}
                className={[
                  'accordion-icon',
                  isExpanded && 'accordion-icon--rotated',
                ]
                  .filter(Boolean)
                  .join(' ')}
              />
            </button>

            <div className='accordion-item-contents' hidden={!isExpanded}>
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
};
