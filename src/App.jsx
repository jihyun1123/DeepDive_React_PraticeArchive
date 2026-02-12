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

  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);


  // 메모 검색 상태 관리
  // 만약 검색창에 "면접"이라고 입력하면, searchQuery는 "면접"이 되어서 부모에게 전달됨
  const [searchQuery, setSearchQuery] = useState(''); 

  // 메모 추가 핸들러
  const handleCreate = async (title, content) => {
    try {
      const newMemo = await createMemo({ title, content });
      setMemos(prev => [newMemo, ...prev]);  // 앞에 추가
    } catch (error) {
      setError('추가에 실패했습니다');
    }
  };

  // 메모 삭제 핸들러
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

  // 렌더링 후 메모 불러오기
  const fetchMemos = async () => {
    setIsLoading(true);
    try {
      const data = await getMemos();
      console.log('API 응답:', data); // 디버깅용
      
      // API 응답 형식에 따라 처리
      if (data.items) {
        setMemos(data.items);
      } else if (Array.isArray(data)) {
        setMemos(data);
      } else {
        console.warn('예상치 못한 API 응답 형식:', data);
        setMemos([]);
      }
      setError(null);
    } catch (err) {
      console.error('메모 로드 실패:', err);
      setError('메모를 불러오는데 실패했습니다');
    } finally {
      setIsLoading(false);
    }
  };

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
        editingMemo={editingMemo}
        onEditCancel={handleEditCancelClick}
      />
      <MemoItemList 
        memos={filterMemos} 
        onDelete={handleDelete} 
        onEditClick={handleEditClick}
        isLoading={isLoading}
        error={error}
        onRefetch={fetchMemos}
      />
    </>
  )
}

export default App
