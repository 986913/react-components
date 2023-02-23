import React from 'react';
import { AutoComplete } from './AutoComplete';

export const AutocompleteWrapper = () => {
  return <AutoComplete api={'https://jsonplaceholder.typicode.com/users'} />;
};
