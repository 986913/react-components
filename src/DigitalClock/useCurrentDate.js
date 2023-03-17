import { useEffect, useState } from 'react';

export const useCurrentDate = () => {
  const [date, setDate] = useState(new Date());

  // kick off the timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date());
    }, 1000);

    // Clear the timer upon unmount
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return date;
};
