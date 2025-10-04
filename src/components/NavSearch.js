import React from 'react';

function NavSearch({query, setQuery}) {

  function handleKeyEnter(e) {
    // if (e.key !== 'Enter') return;
    setQuery(e.target.value);
  }

  return (
      <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={handleKeyEnter}
      />
  );
}

export default NavSearch;