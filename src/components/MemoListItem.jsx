// 메모 리스트 아이템 컴포넌트

export default function MemoListItem({ memo, isSelected, onSelect }) {
    return (
        <li className="memo-item">
            <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(memo.id)}
            />
            {memo.title}
        </li>
    );
}