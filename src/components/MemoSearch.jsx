import "./MemoSearch.css";

export default function MemoSearch({ value = "", onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch?.(value);
  };

  return (
    <div className="memo-search">
      <input
        type="text"
        value={value}
        // onChange는 input의 값이 바뀔 때 발생하는 이벤트로
        // 자동으로 이벤트 객체를 첫 번째 매개변수로 전달함
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="메모 검색..."
      />
      {/* 단순히 사용자가 클릭했는지 여부만 필요하기 때문에 이벤트 객체 필요 없음 */}
      <button type="button" onClick={() => onSearch?.(value)}>
        검색
      </button>
    </div>
  );
}
