import { Link } from "react-router-dom";
import DeleteMemo from "./DeleteMemo";
import "./ItemListMemo.css";

export default function ItemListMemo({
  memos,
  onDelete,
  isLoading,
  error,
  onRefetch,
}) {
  return (
    <div className="memo-list-container">
      {isLoading && <p className="memo-loading">로딩 중...</p>}

      {error && (
        <div className="memo-error">
          <p>❌ 에러: {error}</p>
          <button onClick={onRefetch} className="memo-retry-btn">
            다시 시도
          </button>
        </div>
      )}

      {!isLoading && !error && memos.length === 0 && (
        <p className="memo-empty">메모가 없습니다. 첫 메모를 작성해보세요! 📝</p>
      )}

      {!isLoading && !error && memos.length > 0 && (
        <div className="memo-list">
          {memos.map((memo) => (
            <div key={memo.id} className="memo-item">
              <h3>
                <Link className="memo-title-link" to={`/memos/${memo.id}`}>
                  {memo.title}
                </Link>
              </h3>
              <p>{memo.content}</p>
              <div className="memo-actions">
                <DeleteMemo id={memo.id} onDelete={onDelete} />
                <Link className="memo-edit-btn" to={`/memos/${memo.id}/edit`}>
                  수정
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
