import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);

  const [query, setQuery] = useState('react hooks');

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const response = await axios.get(`/api/v1/search?query=${query}`);
    console.log(response.data);
    setResults(response.data.hits);
  };

  const handleSubmit = event => {
    event.preventDefault();
    getResults();
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
        />
        <button type="submit">Search</button>
      </form>

      <ol>
        {results.map(result => (
          <li key={result.objectID}>
            <a href="{result.url" target="_blank">
              {result.title}
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}

// Now take this and clear the input box but place the last searched item somewher on the page
