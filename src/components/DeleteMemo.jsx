// MemoItemList에서 각각의 메모마다 삭제 버튼을 누르면,
// 해당 메모가 삭제되도록 하는 컴포넌트


export default function DeleteMemo({ id, onDelete }) {
    const handelClick = () => {
        onDelete(id);   // 부모 호출
    }

    return (
        <div className="memo-delete-box">
            <button onClick={handelClick}
                style={{
                    background: '#cd4e4e',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                }}
            >삭제</button>
        </div>
    );

}
