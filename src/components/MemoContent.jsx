// MemoContent.jsx
// MemoContent는 검색 UI를 직접 만들지 않고 부모가 넘겨준 걸 렌더링

import MemoCreate from './MemoCreate';
import MemoSort from './MemoSort';
import MemoUpdate from './MemoUpdate';
import Pagination from './Pagination';
import './style/MemoContent.css'; 

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
    currentPage,      // 현재 페이지
    totalPages,       // 전체 페이지
    onPageChange,     // 페이지 변경 핸들러
    sortField = 'createdAt',  // 정렬 필드
    sortOrder = 'desc',       // 정렬 순서
    onSortChange,     // 정렬 변경 핸들러
    searchSlot,       // 검색 컴포넌트 슬롯
}) {
    return (
        <div className="app">
            <div className="header-box">
                <h1 className="app-title">📝 메모 관리 앱</h1>
                <p>React + axios + CRUD 프로젝트</p>
            </div>
            <div className='main-box'>
                {searchSlot}    {/* 검색 컴포넌트 슬롯 부모가 넘겨준 컴포넌트 렌더링 */}

            <MemoCreate 
                onCreate={onCreate} 
            />
            <MemoSort
                sortField={sortField}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
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
                    {/* 일괄 삭제 버튼 */}
                    <button
                        className='select-delete-button'
                        type="button"
                        onClick={onBatchDelete}
                        disabled={selectedIds.length === 0} // 선택된 메모가 없으면 비활성화
                    >
                        선택된 {selectedIds.length}개 삭제
                    </button>
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
            <Pagination/>
            </div>


        </div>
    );
}
