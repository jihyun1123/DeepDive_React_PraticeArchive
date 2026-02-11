// MemoSort.jsx
// 정렬 및 페이지네이션을 담당하는 컴포넌트

import Pagination from './Pagination';
import './style/MemoSort.css';

export default function MemoSort({
    sortField,    // 정렬 필드
    sortOrder,    // 정렬 순서
    onSortChange, // 정렬 변경 핸들러
    currentPage,  // 현재 페이지
    totalPages,   // 전체 페이지
    onPageChange, // 페이지 변경 핸들러
}) {
    return (
        <div>
            {/* 정렬 필드 선택 */}
            <div className="sort-box">
                <p>정렬 기준 : </p>
                {/* 현재 정렬 순서 유지, 필드만 변경 */}
                <select
                    className="sort-select-field"
                    value={sortField}
                    onChange={(e) => onSortChange?.(e.target.value, sortOrder)}>
                    <option value="createdAt">생성일</option>
                    <option value="updatedAt">수정일</option>
                    <option value="title">제목</option>
                </select>

                <p>정렬 순서 : </p>
                {/* 현재 정렬 필드 유지, 순서만 변경 */}
                <select
                    className="sort-select-order"
                    value={sortOrder}
                    onChange={(e) => onSortChange?.(sortField, e.target.value)}
                >
                    <option value="desc">내림차순</option>
                    <option value="asc">오름차순</option>
                </select>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
        </div>
    );
}
