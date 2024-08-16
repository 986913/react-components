import React from 'react';
import { Tabs } from './Tabs';

const data = [
  {
    id: 1,
    label: 'HTML',
    content:
      'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser',
  },
  {
    id: 2,
    label: 'CSS',
    content:
      'Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.',
  },
  {
    id: 3,
    label: 'Javascript',
    content:
      'JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.',
  },
];

export const TabsWrapper = () => <Tabs items={data} />;
