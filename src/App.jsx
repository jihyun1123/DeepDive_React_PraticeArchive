import { useState, useEffect } from 'react'
import './App.css'
import MemoCreateAndUpdate from './components/memoCreateAndUpdate.jsx'
import MemoHeader from './components/MemoHeader'
import MemoItemList from './components/ItemListMemo'
import MemoSearch from './components/MemoSearch'

// API 함수들 임포트
import { createMemo, deleteMemo, getMemos, updateMemo } from './api/memos'
function App() {
  // 현재 메모의 값과 상태를 관리
  const [memos, setMemos] = useState([]);

  // 수정 중인 메모 상태 관리
  const [editingMemo, setEditingMemo] = useState(null);

  // 에러 상태 관리
  const [error, setError] = useState(null);

  // 메모 검색 상태 관리
  // 만약 검색창에 "면접"이라고 입력하면, searchQuery는 "면접"이 되어서 부모에게 전달됨
  const [searchQuery, setSearchQuery] = useState(''); 

  // 메모 추가 핸들러
  const handleCreate = async (title, content) => {
    try {
      const created = await createMemo({ title, content });
      setMemos(prev => [created, ...prev]);  // 앞에 추가
    } catch (error) {
      setError('추가에 실패했습니다');
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteMemo(id);
      setMemos(prev => prev.filter(memo => memo.id !== id));
    } catch (error) {
      setError('삭제에 실패했습니다');
    }
  };

  // 메모 수정 핸들러
  const handleUpdate = async (id, changes) => {
    try {
      const updated = await updateMemo(id, changes);
      setMemos(prev => prev.map(memo =>
        memo.id === id ? updated : memo
      ));
      setEditingMemo(null); // 수정 모드 종료
    } catch (error) {
      setError('수정에 실패했습니다');
    }
  };

  // 수정 모드 진입
  const handleEditClick = (memo) => {
    setEditingMemo(memo); // 수정할 메모 설정
  };

  // 수정 취소
  const handleEditCancelClick = () => {
    setEditingMemo(null);
  }

  const fetchMemos = async () => {
    const data = await getMemos();
    setMemos(data.items);
  };

  // 렌더링 후 메모 불러오기
  useEffect(() => {
    fetchMemos();
  }, []);

  // 검색어에 따라 필터링된 메모
  const filterMemos = memos.filter(memo =>
    memo.title.includes(searchQuery) ||
    memo.content.includes(searchQuery)
  );


  // 메모 검색 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  return (
    <>
      <MemoHeader />
      <MemoSearch onSearch={handleSearch} />
      <MemoCreateAndUpdate 
        onCreate={handleCreate} 
        onUpdate={handleUpdate} 
        editingMemo={editingMemo} // 현재 수정 중인 메모 전달
        onEditCancel={handleEditCancelClick}
      />
      <MemoItemList memos={filterMemos} onDelete={handleDelete} onEditClick={handleEditClick} />
    </>
  )
}

export default App