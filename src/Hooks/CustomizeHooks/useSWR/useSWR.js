import { useState, useEffect } from 'react';

export const useSWR = (_key, fetcher) => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  const fetchRes = fetcher();
  const isPromise = fetchRes instanceof Promise;

  const fetchData = async () => {
    try {
      const response = await fetchRes;
      setData(response);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (isPromise) {
      fetchData();
    }
  }, []);

  return {
    data: isPromise ? data : fetchRes,
    error,
  };
};
