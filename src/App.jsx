import { useEffect, useState } from 'react';
import MemoSearch from './components/memoSearch';
import MemoContent from './components/MemoContent';
import MemoCreate from './components/MemoCreate';
import { createMemo, getMemos, updateMemo } from './api/memos';
import './App.css';

function App() {
  // 메모 상태 관리
  const [memos, setMemos] = useState([]);
  // 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState('');

  // 로딩 및 에러 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 메모 불러오기 함수
  const fetchMemos = async (param) => {
    setIsLoading(true);
    setError(null);
    try{
      const data = await getMemos(param);
      const items = Array.isArray(data?.items) ? data.items : data;
      setMemos(items);
    } catch(err){
      setError(err?.message ?? '알 수 없는 에러');
    } finally{
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    // 초기 메모 불러오기
    fetchMemos({ q: searchQuery });
  }, [searchQuery])

  // 검색어 변경 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // 재시도 핸들러
  const refetch = () => {
    fetchMemos({ q: searchQuery });
  };

  // 새 메모 추가 핸들러
  const handleCreate = async (payload) => {
    try {
      const newMemo = await createMemo(payload);
      setMemos((prev) => [newMemo, ...prev]);
    } catch (err) {
      setError('추가에 실패했습니다');
    }
  };

  // 특정 메모 수정 ( map 패턴 )
  const handleUpdate = async (id, changes) => {
    try {
      const updated = await updateMemo(id, changes);
      setMemos((prev) => prev.map((memo) => (memo.id === id ? updated : memo)));
    } catch (err) {
      setError('수정에 실패했습니다');
    }
  };

  return (
    // 화면 분기 예시 코드 붙임
    <>
    <MemoContent
      memos={memos}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      searchSlot={<MemoSearch onSearch={handleSearch} />}
    />
    <MemoCreate 
      onCreate={handleCreate} 
    />
    <MemoUpdate 
      onUpdate={handleUpdate}
    />
    </>
  );
}

export default App;
