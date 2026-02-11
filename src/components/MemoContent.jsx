// MemoContent.jsx
// MemoContent는 검색 UI를 직접 만들지 않고 부모가 넘겨준 걸 렌더링

import MemoCreate from './MemoCreate';
import MemoUpdate from './MemoUpdate';

// 메모 내용 표시 컴포넌트
export default function MemoContent({
    memos,
    isLoading,
    error,
    onRetry,
    onCreate,         // 메모 추가 핸들러
    onDelete,         // 개별 삭제 핸들러
    onUpdate,         // 메모 수정 핸들러
    selectedIds,      // 선택된 메모 ID 배열
    onSelect,         // 체크박스 토글 핸들러
    onBatchDelete,    // 일괄 삭제 핸들러
    searchSlot,       // 검색 컴포넌트 슬롯
}) {
    return (
        <div className="app">
            <div className="header-box">
                <h1 className="app-title">📝 메모 관리 앱</h1>
                <p>React + axios + CRUD 프로젝트</p>
            </div>
            {searchSlot}
            <MemoCreate 
                onCreate={onCreate} 
            />
            <MemoUpdate 
                onUpdate={onUpdate}
            />
            {isLoading && <p>로딩 중...</p>}

            {error && (
                <div>
                    <p>에러: {error}</p>
                    <button type="button" onClick={onRetry}>    {/*재시도 버튼 : 에러 UI에 다시 시도 버튼 추가*/}
                        다시 시도
                    </button>
                </div>
            )}

            {!isLoading && !error && memos.length === 0 && (
                <>
                    <p>메모가 없습니다. 첫 메모를 작성해보세요!</p> {/* 빈 상태 유도 Empty UI에 "첫 메모 작성" 버튼 추가 */}
                    <button type="button" onClick={onCreate}>첫 메모 작성</button>
                </>
            )}

            {!isLoading && !error && memos.length > 0 && (
                <>
                    {selectedIds.length > 0 && (
                        <button
                            type="button"
                            onClick={onBatchDelete}
                        >
                            선택된 {selectedIds.length}개 삭제
                        </button>
                    )}
                    <ul className="memo-list">
                        {memos.map((memo) => (
                            <li key={memo.id} className="memo-item">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(memo.id)}
                                    onChange={() => onSelect(memo.id)}
                                />
                                {memo.title}
                                <button type="button" onClick={() => onDelete(memo.id)}>
                                    삭제
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
