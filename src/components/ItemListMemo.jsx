import DeleteMemo from "./DeleteMemo";

export default function ItemListMemo({memos, onDelete}) {

    // jsx에서 return문은 jsx문법으로 작성해야되기 때문에
    // JS 문법을 쓰려면 중괄호{}로 감싸야 한다.
    return(
        <div>
            <h3>📝 메모 목록</h3>
            { memos.map(memo => (
                // key는 고유한 요소임을 알려주는 식별자
                <div key={memo.id} className="memo-item">
                    <h3>{memo.title}</h3>
                    <p>{memo.content}</p>
                    <DeleteMemo id={memo.id} onDelete={onDelete} />
                </div>
            ))
            }
        </div>
    );

}