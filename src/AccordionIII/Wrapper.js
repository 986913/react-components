import React from 'react';
import { AccordionIII } from './AccordionIII';

const data = [
  {
    value: 'html',
    title: 'HTML',
    contents:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    value: 'css',
    title: 'CSS',
    contents:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    value: 'javascript',
    title: 'JavaScript',
    contents:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];

/**
 * AccordionIII 与 AccordionII 的区别：只是增加了Accessbility keyboard的东西，function逻辑没变
 */
export const AccordionIIIWrapper = () => {
  return (
    <div className='wrapper'>
      <AccordionIII sections={data} />
    </div>
  );
};
