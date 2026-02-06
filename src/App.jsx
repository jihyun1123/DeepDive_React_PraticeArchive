import { useState } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Stats from './components/Stats';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '리액트 공부하기', completed: false },
    { id: 2, text: '점심 먹기', completed: true },
    { id: 3, text: '운동하기', completed: false },
  ]);

  // 추가
const addTodo = (text) => {
  const newTodo = { id: Date.now(), text, completed: false }; // 새 항목 생성
  setTodos(prev => [...prev, newTodo]); // 기존 배열 복사 후 새 항목 추가
};

// 삭제
const deleteTodo = (id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id)); // 해당 id를 제외한 새 배열 생성
};

// 토글
// 토글이란? 완료/미완료 상태를 반전시키는 것
const toggleTodo = (id) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};

// 파생값 (state 아님!)
// 완료된 항목의 개수 계산
const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="app section-style">
      <Header />
      <TodoForm onAdd={addTodo} />
      <Stats todos={todos} completedCount={completedCount} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  );
}

export default App; 
