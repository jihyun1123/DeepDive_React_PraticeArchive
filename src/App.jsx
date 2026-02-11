import { useEffect, useState } from 'react';
import MemoSearch from './components/memoSearch';
import MemoContent from './components/MemoContent';
import MemoCreate from './components/MemoCreate';
import MemoUpdate from './components/MemoUpdate';
import { createMemo, deleteMemo, getMemos, updateMemo } from './api/memos';
import './App.css';

function App() {
  // 메모 상태 관리
  const [memos, setMemos] = useState([]);
  // 검색어 상태 관리
  const [searchQuery, setSearchQuery] = useState('');

  // 로딩 및 에러 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // 선택된 메모 ID 배열 (일괄 삭제용)
  const [selectedIds, setSelectedIds] = useState([]);

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

  // 특정 메모 삭제 핸들러 ( filter 패턴 )
  const handleDelete = async (id) => {
    try {
      await deleteMemo(id);
      setMemos(prev => prev.filter(memo => memo.id !== id));
    } catch (err) {
      setError('삭제에 실패했습니다');
    }
  };

  // 체크박스 선택 토글
  const handleSelect = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  // 일괄 삭제 핸들러
  const handleBatchDelete = async() => {
    // selectedIds가 비어있으면 아무 동작도 하지 않음
    if(selectedIds.length === 0) return;

    try{
      // 모든 선택된 메모 삭제
      await Promise.all(selectedIds.map(id => deleteMemo(id)));
      // 삭제된 메모를 상태에서 제거, selectedIds가 아닌 id를 가진 메모만 남김
      setMemos(prev => prev.filter(memo => !selectedIds.includes(memo.id)));
      setSelectedIds([]);   // 선택된 ID 초기화
    } catch(err){
      setError('일괄 삭제에 실패했습니다');
    }
  };

  return (
    <>
    <MemoContent
      memos={memos}
      isLoading={isLoading}
      error={error}
      onRetry={refetch}
      onCreate={handleCreate}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      selectedIds={selectedIds}
      onSelect={handleSelect}         // 체크박스 토글 핸들러 전달
      onBatchDelete={handleBatchDelete} // 일괄 삭제 핸들러 전달
      searchSlot={<MemoSearch onSearch={handleSearch} />}
    />
    </>
  );
}

export default App;
