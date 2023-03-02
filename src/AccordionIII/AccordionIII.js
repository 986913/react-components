import React, { useState, useId } from 'react';
import './accordion.css';

const getAccordionHeaderId = (accordionId, value) =>
  accordionId + '-header-' + value;
const getAccordionPanelId = (accordionId, value) =>
  accordionId + '-panel-' + value;

export const AccordionIII = ({ sections }) => {
  const accordionId = useId();
  const [openSections, setOpenSections] = useState(new Set());

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
        const isExpanded = openSections.has(value);
        const headerId = getAccordionHeaderId(accordionId, value);
        const panelId = getAccordionPanelId(accordionId, value);

        return (
          <div className='accordion-item' key={value}>
            <button
              className='accordion-item-title'
              type='button'
              onClick={() => handleClick(value)}
              id={headerId}
              aria-controls={panelId}
              aria-expanded={isExpanded}
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

            <div
              className='accordion-item-contents'
              hidden={!isExpanded}
              id={panelId}
              role='region'
              aria-labelledby={headerId}
            >
              {contents}
            </div>
          </div>
        );
      })}
    </div>
  );
};
