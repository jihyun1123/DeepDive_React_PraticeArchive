import { useState } from 'react';

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
    <div className="memo-search">
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
      />
      <button type="button" onClick={handleSearch}>
        검색
      </button>
    </div>
  );
}