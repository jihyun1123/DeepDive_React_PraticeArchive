// 할일 하나 (todo)를 화면에 보여주고, 체크 및 삭제 이벤트가 발생하면 부모에게 알려주는 역할

import './TodoItem.css';

function TodoItme({ todo, onToggle, onDelete}){
  return(
    <li className="item">
      <input
        type="checkbox"
        checked={todo.completed} // 체크박스 상태 설정 / 완료된 항목이면 체크됨
        onChange={() => onToggle(todo.id)} // 체크박스 변경 시 토글 핸들러 호출
      />

      {/* 할일 텍스트, 완료된 항목이면 취소선 적용 */}
      <span className={`text ${todo.completed ? 'completed' : ''}`}>
        {todo.text}
      </span>
      <button className="delete" onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  );
}

export default TodoItem;
