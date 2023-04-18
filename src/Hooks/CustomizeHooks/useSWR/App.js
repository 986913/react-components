import { useSWR } from './useSWR';

/**
 * SWR is a popular library of data fetching. Let's try to implement the basic usage by ourselves.
 *  1. this is not to replicate the true implementation of useSWR()
 *  2. The first argument key is for deduplication, we can safely ignore it for now
 */
export default function App() {
  const fetcher = () => fetch('https://jsonplaceholder.typicode.com/todos/1');
  /*********************  hook usage ****************************************/
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/todos/1',
    fetcher
  );

  if (error) return <div>failed</div>;
  if (!data) return <div>loading</div>;

  return <div>Successed !</div>;
}
