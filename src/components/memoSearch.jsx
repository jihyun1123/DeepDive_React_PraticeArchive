import { useState } from 'react';
import './style/MemoSearch.css';

export default function MemoSearch({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(inputValue);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="memo-search-box">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메모 검색..."
      />
      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}