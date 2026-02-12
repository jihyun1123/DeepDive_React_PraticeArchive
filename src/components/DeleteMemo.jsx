// MemoItemList에서 각각의 메모마다 삭제 버튼을 누르면,
// 해당 메모가 삭제되도록 하는 컴포넌트

export default function DeleteMemo({ id, onDelete }) {
    const handleClick = () => {
        // 사용자 확인 창
        const confirmed = window.confirm('정말 이 메모를 삭제하시겠습니까?');
        if (confirmed) {
            onDelete(id);
        }
    }

    return (
        <button 
            onClick={handleClick}
            className="memo-delete-btn"
        >
            삭제
        </button>
    );
}
