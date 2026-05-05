import React from 'react';

interface SearchBarProps {
  value: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {
  return (
    <div className="position-relative w-100">
      <input
        type="text"
        className="form-control"
        placeholder="Search cities or countries..."
        value={value}
        onChange={(e) => onSearch(e.target.value)}
        style={{ paddingLeft: '20px', borderRadius: '50px' }}
      />
    </div>
  );
};

export default SearchBar;
