import React, { useState } from 'react';
import { HeartIcon, SpinnerIcon } from './icons';
import './likebutton.css';

// 👍 helper function
const classNames = (...args) => args.filter(Boolean).join(' ');

export const LikeButton = ({ sections }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  async function postData(url = '', data = {}) {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // use response.ok to see if api goes wrong or successfully
      if (!response.ok) {
        response.json().then((data) => {
          setErrorMessage(data.error);
        });
        return;
      }

      setIsLiked(!isLiked);
    } finally {
      setIsLoading(false);
    }
  }

  const handleClick = () => {
    postData('https://www.greatfrontend.com/api/questions/like-button', {
      action: isLiked ? 'unlike' : 'like',
    });
  };

  return (
    <div>
      <button
        className={classNames('button', isLiked && 'liked')}
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? <SpinnerIcon /> : <HeartIcon />}
        {isLiked ? 'Liked' : 'Like'}
      </button>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </div>
  );
};
