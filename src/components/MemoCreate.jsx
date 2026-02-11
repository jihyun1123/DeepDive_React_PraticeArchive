// 새 메모 추가

export default function MemoCreate({ onCreate }) {
    const handleSubmit = () => {
        onCreate({ title: '새 메모', content: '' });
    };

    return (
        <button type="button" onClick={handleSubmit}>
            추가
        </button>
    );
}