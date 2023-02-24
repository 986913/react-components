import React from 'react';
import { useState, useEffect } from 'react';
import { Poll } from './Poll';

//pretending api data:
/*
  const data = [
    { title: 'React', voteRate: 60, id: 1 },
    { title: 'Vue', voteRate: 30, id: 2 },
    { title: 'Angular', voteRate: 10, id: 3 },
  ];
*/

export const PollWrapper = () => {
  return (
    <Poll
      //  list={data}
      header='please vote your fav framework!'
    />
  );
};
