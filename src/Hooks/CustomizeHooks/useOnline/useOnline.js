import { useState, useEffect } from 'react';

export const useOnline = () => {
  const [online, setOnline] = useState(navigator.onLine);
  const handleOnLine = () => setOnline(true);
  const handleOffLine = () => setOnline(false);

  useEffect(() => {
    window.addEventListener('online', handleOnLine, false);
    window.addEventListener('offline', handleOffLine, false);

    return () => {
      window.removeEventListener('online', handleOnLine, false);
      window.removeEventListener('offline', handleOffLine, false);
    };
  });

  return online;
};
