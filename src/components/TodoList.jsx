// 할 일 배열을 받아서, 비어 있으면 빈 화면을 보여주고, 있으면 각 항목을 TodoItem 컴포넌트로 렌더링

import TodoItem from './TodoItem';
import EmptyState from './EmptyState';
import './TodoList.css';
import { useRef } from 'react';

function TodoList({ todos, onToggle, onDelete}){
    // 할 일 항목이 없을 때 빈 화면 표시
    if(todos.length === 0){
        return <EmptyState />;
    }

    return(
        <ul className="list">
            {/* 할 일 항목이 있을 때 각 항목을 TodoItem 컴포넌트로 렌더링
                { } : JSX 내부에서 자바스크립트 표현식을 사용하기 위한 구문
            */}
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                />
            ))}
            {/* 스크롤 이동을 위한 빈 요소 */}
            <li id="list-end"></li>
        </ul>
    )
}


export default TodoList;