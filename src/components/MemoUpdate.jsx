
export default function MemoUpdate({ onUpdate }) {
    const handleUpdate = () => {
        const id = 1;
        const changes = { title: '수정된 메모', content: '내용이 수정되었습니다.' };
        onUpdate(id, changes);
    };

    return(
        <button type="button" onClick={handleUpdate}>
            수정
        </button>
    );
}