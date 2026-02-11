import { useState } from 'react';
import './App.css';

function App() {
  // 상태 설계 예시 코드 붙임
  const [memos] = useState([]);
  const [isLoading] = useState(false);
  const [error] = useState(null);

  const refetch = () => {
    // fetch logic goes here
  };

  return (
    // 화면 분기 예시 코드 붙임
    <div className="app">
      <h1 className="app-title">Memo Task</h1>
      {isLoading && <p>로딩 중...</p>}

      {error && (
        <div>
          <p>에러: {error}</p>
          <button type="button" onClick={refetch}>
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error && memos.length === 0 && (
        <p>메모가 없습니다. 첫 메모를 작성해보세요!</p>
      )}

      {!isLoading && !error && memos.length > 0 && (
        <ul className="memo-list">
          {memos.map((memo) => (
            <li key={memo.id} className="memo-item">
              {memo.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
