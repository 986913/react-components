import React from 'react';
import { Mentions } from './Mentions';

export const MentionsWrapperI = () => {
  const onChangeCallback = (inputText) => {
    // do your custom function here, 这只是暴露了个callback function
    console.log(inputText);
  };
  const onSelectCallback = (selectedValue) => {
    // do your custom function here, 这只是暴露了个callback function
    console.log(selectedValue);
  };

  return (
    <div>
      <Mentions
        defaultValue='mingyue'
        onChange={onChangeCallback}
        onSelect={onSelectCallback}
      >
        <li>mingyue</li>
        <li>hado</li>
        <li>user1</li>
      </Mentions>
    </div>
  );
};
