import { useState, useEffect } from 'react'
import './App.css'
import MemoCreate from './components/memoCreate'
import MemoHeader from './components/MemoHeader'
import MemoItemList from './components/ItemListMemo'

// API 함수들 임포트
import { createMemo, deleteMemo, getMemos, updateMemo } from './api/memos'

function App() {
  // 현재 메모의 값과 상태를 관리
  const [memos, setMemos] = useState([]);

  // 메모 추가 핸들러
  const handleCreate = async (title, content) => {
    try {
      const newMemo = await createMemo({ title, content });
      setMemos(prev => [newMemo, ...prev]);  // 앞에 추가
    } catch (err) {
      setError('추가에 실패했습니다');
    }
  };

  // 메모 삭제 핸들러
  const handleDelete = async (id) => {
    try {
      await deleteMemo(id);
      setMemos(prev => prev.filter(memo => memo.id !== id));
    } catch (err) {
      setError('삭제에 실패했습니다');
    }
  };

  // 렌더링 후 메모 불러오기
  useEffect(() => {
    const fetchMemos = async() => {
      const data = await getMemos();
      setMemos(data.items);
    }
    fetchMemos();
  }, []);


  return (
    <>
      <MemoHeader />
      <MemoCreate onCreate={handleCreate} />
      <MemoItemList memos={memos} onDelete={handleDelete} />
    </>
  )
}

export default App
