import DeleteMemo from "./DeleteMemo";
import './ItemListMemo.css';

export default function ItemListMemo({memos, onDelete, onEditClick, isLoading, error, onRefetch}) {

    return(
        <div className="memo-list-container">
            {isLoading && <p className="memo-loading">로딩 중...</p>}

            {error && (
                <div className="memo-error">
                    <p>❌ 에러: {error}</p>
                    <button onClick={onRefetch} className="memo-retry-btn">다시 시도</button>
                </div>
            )}

            {!isLoading && !error && memos.length === 0 && (
                <p className="memo-empty">메모가 없습니다. 첫 메모를 작성해보세요! 📝</p>
            )}

            {!isLoading && !error && memos.length > 0 && (
                <div className="memo-list">
                    {memos.map(memo => (
                        <div key={memo.id} className="memo-item">
                            <h3>{memo.title}</h3>
                            <p>{memo.content}</p>
                            <div className="memo-actions">
                                <DeleteMemo id={memo.id} onDelete={onDelete} />
                                <button className="memo-edit-btn" type="button" onClick={() => onEditClick(memo)}>
                                    수정
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

}