import { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

// API search function
function searchCharacters(search) {
  const apiKey = '035d4cfafe3493dd3d02841ca582a4ab';
  return fetch(
    `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
    {
      method: 'GET',
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.results)
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState(''); // State and setters for Search term
  const [results, setResults] = useState([]); // API search results
  const [isSearching, setIsSearching] = useState(false); // Searching status (whether there is pending API request)

  // Debounce search term so that it only gives us latest value if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  return (
    <div>
      <input
        placeholder='Search Marvel Comics'
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isSearching && <div>Searching ...</div>}
      {results.map((result) => (
        <div key={result.id}>
          <h4>{result.title}</h4>
          <img
            alt='test'
            src={`${result.thumbnail.path}/portrait_incredible.${result.thumbnail.extension}`}
          />
        </div>
      ))}
    </div>
  );
}
