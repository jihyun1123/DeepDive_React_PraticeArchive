import { useState, useEffect } from 'react';
import './style/MemoCreate.css';

export default function MemoCreate({ onCreate, editingMemo, onUpdate, onEditCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // editingMemo가 변경되면 form 초기화
  useEffect(() => {
    if (editingMemo) {
      setTitle(editingMemo.title);
      setContent(editingMemo.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingMemo]);

  // 메모 추가/수정 핸들러
  const handleSubmit = () => {
    if (title.trim() || content.trim()) {
      if (editingMemo) {
        // 수정 모드
        onUpdate(editingMemo.id, { title, content });
        onEditCancel();
      } else {
        // 추가 모드
        onCreate({ title, content });
      }
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="create-box">
        <h2>{editingMemo ? '✏️ 메모 수정' : '➕ 새 메모 추가'}</h2>
        <p>제목</p>
        <input    
        type="text"
        className="title-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력하세요">
        </input>
        <p>내용</p>
        <textarea
            className="content-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
        />
        <div className="button-group">
          <button type="button" onClick={handleSubmit}>
              {editingMemo ? '수정 완료' : '추가'}
          </button>
          {editingMemo && (
            <button type="button" onClick={onEditCancel} className="cancel-button">
              취소
            </button>
          )}
        </div>
    </div>
  );
}