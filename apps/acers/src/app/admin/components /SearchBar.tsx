import React from 'react';

const SearchBar = () => {
  const handleSearch = () => {
    // Prompt user for input
    const query = prompt('Enter your search query:');
    if (query) {
      // Perform search action
      console.log('Searching for:', query);
      // You can also redirect or fetch data based on the query
    }
  };

  return (
    <div className="search-bar">
      <button
        onClick={handleSearch}
        className="search-button"
      >
        🔍 Search
      </button>
    </div>
  );
};

export default SearchBar;