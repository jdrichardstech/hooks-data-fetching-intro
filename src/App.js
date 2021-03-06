import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('react hooks');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchInputRef = useRef();

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    try {
      const response = await axios.get(`/api/v1/search?query=${query}`);
      console.log(response.data);
      setResults(response.data.hits);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    getResults();
  };
  const handleClearSearch = () => {
    setQuery('');
    searchInputRef.current.focus();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {' '}
        <input
          type="text"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
          }}
          ref={searchInputRef}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearSearch}>
          Clear
        </button>
      </form>

      {loading ? (
        <div>Loading results...</div>
      ) : (
        <ol>
          {results.map(result => (
            <li key={result.objectID}>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </li>
          ))}
        </ol>
      )}
      {error && <div>{error.message}</div>}
    </>
  );
}
