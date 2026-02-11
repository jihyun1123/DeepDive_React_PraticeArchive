// Pagination.jsx
// 페이지네이션을 담당하는 컴포넌트

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}){
    return(
        <div>
            <button type="button" onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}>
                이전
            </button>

            {/* 페이지 번호 버튼 렌더링, JSX에서 JS 쓰기 위해 {}로 감쌈 */}
            {
                [...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return(
                        <button
                            type="button"
                            key={page}  // React가 리스트 요소를 구분하기 위한 고유 식별자
                            onClick={() => onPageChange(page)}
                            disabled={currentPage === page}
                            className={currentPage === page ? 'active' : ''}
                        >
                            {page}
                        </button>
                    )
                })
            }

            <button type="button" onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
                다음
            </button>
        </div>
    );
}

