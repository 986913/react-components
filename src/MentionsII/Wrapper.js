import React, { useState } from 'react';
import { Mentions } from './Mentions';

export const MentionsWrapperII = () => {
  const [users, setUsers] = useState([]);

  const onChangeCallback = (inputText, searchTxt) => {
    console.log(inputText, searchTxt);
    fetchGithubUsers(searchTxt);
  };
  const onSelectCallback = (selectedValue) => {
    console.log(selectedValue);
  };

  const fetchGithubUsers = (key) => {
    /* 这个API不稳定,重新找个api  */
    // fetch(`https://api.github.com/search/users?q=${key}`)
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((res) => {
        setUsers(res);
        // setUsers(res.items);
      });
  };

  return (
    <div className='App'>
      <Mentions
        defaultValue='mingyue'
        onChange={onChangeCallback}
        onSelect={onSelectCallback}
      >
        {users &&
          users.map((u, index) => {
            // return <li key={u.id}>{u.login}</li>;
            return <li key={u.id}>{u.username}</li>;
          })}
      </Mentions>
    </div>
  );
};
