import DeleteMemo from "./DeleteMemo";
import './ItemListMemo.css';

export default function ItemListMemo({memos, onDelete, onEditClick}) {

    // jsx에서 return문은 jsx문법으로 작성해야되기 때문에
    // JS 문법을 쓰려면 중괄호{}로 감싸야 한다.
    return(
        <div>
            { memos.map(memo => (
                // key는 고유한 요소임을 알려주는 식별자
                <div key={memo.id} className="memo-item">
                    <h3>{memo.title}</h3>
                    <p>{memo.content}</p>
                    {/* 삭제 컴포넌트 */}
                    <DeleteMemo id={memo.id} onDelete={onDelete} />
                    {/* 수정 버튼 클릭 시 onEditClick 핸들러 호출 */}
                    <button className="memo-edit-button" type="button" onClick={() => onEditClick(memo)}>
                        수정
                    </button>
                </div>
            ))
            }
        </div>
    );

}