import React from 'react';
import { usaLoactions } from './dataConfig';
import { NestedCheckbox } from './NestedCheckbox';

export const NestedCheckboxWrapper = () => (
  <NestedCheckbox dataConfig={usaLoactions} />
);
