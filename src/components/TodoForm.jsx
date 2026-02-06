// 입력값을 스스로 관리하고, 추가 기능은 부모(App.jsx)에 요청만 하는 컴포넌트

import { useState } from 'react';
import './TodoForm.css';

function TodoForm({onAdd}){
    const [input, setInput] = useState('');

    // 폼 제출 핸들러
    const handleSubmit = (e) => {
        e.preventDefault(); // 기본 폼 제출 동작 방지
        if(input.trim()){   // 공백이 아닌 경우 true되서, 조건문 실행됨
            onAdd(input);   // 부모 컴포넌트(App.jsx)로 입력 값 전달
            setInput('');   // 입력 필드 초기화
        }   
    }

    return(
        // 폼 제출 시 handleSubmit 호출
        <form onSubmit={handleSubmit} className="form">
            <input
                type="text"
                placeholder="할 일을 입력하세요"
                className='input'
                value={input}   // 입력 필드 값과 상태 동기화
                onChange={(e) => setInput(e.target.value)} // 입력 값 변경 시 상태 업데이트
            />
            <button type="submit" className="button">추가</button>
        </form>
    );
}


export default TodoForm;