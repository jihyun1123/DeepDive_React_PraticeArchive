import { useState } from 'react';

export default function MemoCreate({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 메모 추가 핸들러
  const handleSubmit = () => {
    if (title.trim() || content.trim()) {
      onCreate({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="create-box">
        <h2>➕ 새 메모 추가</h2>
        <p>제목</p>
        <input    
        type="text"
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요">
        </input>
        <p>내용</p>
        {/* 내용 입력 필드, 여러 줄 입력하기 위하여*/}
        <textarea
            className="content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
        />
        <button type="button" onClick={handleSubmit}>
            추가
        </button>
    </div>
  );
}