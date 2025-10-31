import React, { useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onLocationFilter: (location: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onLocationFilter,
  placeholder = 'Search events...',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, onSearch]);

  // Debounce location filter
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onLocationFilter(locationQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [locationQuery, onLocationFilter]);

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="search-input-container">
        <span className="search-icon">📍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Filter by location..."
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
