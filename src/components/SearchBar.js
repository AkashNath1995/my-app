import React, { useState } from 'react';

const SearchBar = ({ setSearchTerm, searchMovies }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchTerm(query);
    searchMovies();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search movies...'
        value={query}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;
