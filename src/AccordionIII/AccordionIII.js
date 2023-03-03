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

  // <-- diff
  const focusOnSection = (index) => {
    document
      .getElementById(getAccordionHeaderId(accordionId, sections[index].value))
      .focus();
  };

  // <-- diff
  const handleKeyDown = (event) => {
    const activeItemValue = document.activeElement.getAttribute(
      'data-accordion-value'
    );

    // Only respond to these interactions if an accordion title is in focus.
    if (activeItemValue == null) return;

    switch (event.code) {
      case 'ArrowUp': {
        const index = sections.findIndex(
          ({ value: itemValue }) => itemValue === activeItemValue
        );
        focusOnSection((index - 1 + sections.length) % sections.length);
        break;
      }
      case 'ArrowDown': {
        const index = sections.findIndex(
          ({ value: itemValue }) => itemValue === activeItemValue
        );
        focusOnSection((index + 1) % sections.length);
        break;
      }
      case 'Home': {
        focusOnSection(0);
        break;
      }
      case 'End': {
        focusOnSection(sections.length - 1);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div className='accordion' onKeyDown={handleKeyDown}>
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
              data-accordion-value={value} // <-- diff
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
