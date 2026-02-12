import { useState, useEffect } from "react";
import './memoCreateAndUpdate.css';

export default function MemoCreate({onCreate, onUpdate, editingMemo, onEditCancel}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 특정값(editingMemo)이 변경될 때 실행되는 효과를 위하여 useEffect 사용
    useEffect(()=>{
        // editingMemo : 현재 수정 중인 메모 객체를 담는 상태
        // editingMemo가 존재할 때 true이기 때문에 수정 모드 진입
        if(editingMemo){
            setTitle(editingMemo.title);
            setContent(editingMemo.content);
        } else{     // editingMemo가 null일 때 (수정 모드 종료 시)
            setTitle("");
            setContent("");
        }
    }, [editingMemo]);  // editingMemo가 변경될 때마다 실행

    const handleAdd = () => {
        // 수정 모드인지 확인
        if(editingMemo){
            onUpdate(editingMemo.id, { title, content });
        }else{
            onCreate(title, content);
        }
        setTitle("");
        setContent("");
    }

    return(
        <div className="memo-create-box">
            <h2>{editingMemo ? "메모 수정" : "새 메모 작성"}</h2>
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
            <button onClick={handleAdd}>{editingMemo ? "수정 완료" : "추가"}</button>
            {editingMemo && <button onClick={onEditCancel}>수정 취소</button>}
        </div>
    );
}
