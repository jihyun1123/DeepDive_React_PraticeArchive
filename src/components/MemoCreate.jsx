import { useState } from "react";

export default function MemoCreate({onCreate}){
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleAdd = () => {
        // onCreate 콜백 함수 호출, 부모에게 데이터 전달 및 생성 요청
        onCreate(title, content);
        // 입력 초기화
        setTitle("");
        setContent("");
    }

    return(
        <div className="memo-create-box">
            <h2>새 메모 작성</h2>
            <p>제목</p>
            <input  
                className="memo-input-title"
                type="text"
                value={title}   // input 값과 state 연결
                onChange={(e) => setTitle(e.target.value)} // 입력 변경 시 state 업데이트
                placeholder="메모 제목을 입력하세요">
            </input>
            <p>내용</p>
            <textarea
                className="memo-input-content"
                value={content}   // input 값과 state 연결
                onChange={(e) => setContent(e.target.value)} // 입력 변경 시 state 업데이트
                placeholder="메모 내용을 입력하세요">
            </textarea>
            <br />
            <button onClick={handleAdd}>추가</button>
        </div>
    );
}
