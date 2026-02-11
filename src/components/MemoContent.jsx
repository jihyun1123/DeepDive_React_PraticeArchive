// MemoContent.jsx
// MemoContent는 검색 UI를 직접 만들지 않고 부모가 넘겨준 걸 렌더링

// 메모 내용 표시 컴포넌트
export default function MemoContent({
  memos,
  isLoading,
  error,
  onRetry,
  searchSlot,       // 검색 컴포넌트 슬롯
}) {
  return (
    <div className="app">
      <div className="header-box">
        <h1 className="app-title">📝 메모 관리 앱</h1>
        <p>React + axios + CRUD 프로젝트</p>
      </div>
      {searchSlot}
      {isLoading && <p>로딩 중...</p>}

      {error && (
        <div>
          <p>에러: {error}</p>
          <button type="button" onClick={onRetry}>
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
