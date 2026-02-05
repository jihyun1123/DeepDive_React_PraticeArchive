// 할 일 배열을 받아서, 비어 있으면 빈 화면을 보여주고, 있으면 각 항목을 TodoItem 컴포넌트로 렌더링

import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import './TodoList.css';

function TodoList({ todos, onToggle, onDelete }) {
    if (todos.length === 0) {
        return <EmptyState />;
    }

    return (
        <ul className="list">
            {/* 배열의 각 todo를 하나의 TodoItem 컴포넌트로 변환 */}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}

export default TodoList;