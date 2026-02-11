import { useEffect, useState } from 'react';
import MemoSearch from './components/memoSearch';
import MemoContent from './components/MemoContent';
import Pagination from './components/Pagination';
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

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 정렬 상태
  const [sortField, setSortField] = useState('createdAt');  // 기본 정렬 필드, 데이터가 생성된 시간 저장
  const [sortOrder, setSortOrder] = useState('desc'); // 기본 정렬 순서, 내림차순

  // 메모 불러오기 함수
  const fetchMemos = async (param = {}) => {
    setIsLoading(true);
    setError(null);
    try{
      const data = await getMemos({
        ...param,           // 기존 파라미터 유지
        page: currentPage,
        sort: sortField,
        order: sortOrder,
        limit: 10,          // 페이지당 10개 메모만 보이기
      });
      // API 응답에서 items가 배열인지 확인 후 상태 업데이트
      const items = Array.isArray(data?.items) ? data.items : data;
      setMemos(items);
      setTotalPages(data?.totalPages || 1); // totalPages 저장
    } catch(err){
      setError(err?.message ?? '알 수 없는 에러');
    } finally{
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    // 초기 메모 불러오기
    fetchMemos({ q: searchQuery, limit: 10 });
  }, [searchQuery, currentPage, sortField, sortOrder])

  // 검색어 변경 핸들러
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // 재시도 핸들러
  const refetch = () => {
    fetchMemos({ q: searchQuery, limit: 10 });
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
  const handleBatchDelete = async () => {
    if(selectedIds.length === 0) return;
    try{
      await Promise.all(selectedIds.map(id => deleteMemo(id)));
      setMemos(prev => prev.filter(memo => !selectedIds.includes(memo.id)));
      setSelectedIds([]);
    } catch(err){
      setError('일괄 삭제에 실패했습니다');
    }
  };

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 정렬 변경 핸들러, 생성 날짜 내림차순 순서 => 최신순
  const handleSortDayChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
    setCurrentPage(1);
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
      onSelect={handleSelect}
      onBatchDelete={handleBatchDelete}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      sortField={sortField}
      sortOrder={sortOrder}
      onSortChange={handleSortDayChange}
      searchSlot={<MemoSearch onSearch={handleSearch} />}
    />
    </>
  );
}

export default App;
