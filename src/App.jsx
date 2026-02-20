import { useReducer, useEffect } from 'react'
import './App.css'
import MemoCreateAndUpdate from './components/memoCreateAndUpdate.jsx'
import MemoHeader from './components/MemoHeader'
import MemoItemList from './components/ItemListMemo'
import MemoSearch from './components/MemoSearch'

// API 함수들 임포트
import { createMemo, deleteMemo, getMemos, updateMemo } from './api/memos'

// 📌 initialState 정의
const initialState = {
  memos: [],
  editingMemo: null,
  error: null,
  searchQuery: '',
};

// 📌 reducer 함수 정의
function memoReducer(state, action) {
  switch (action.type) {
    // 서버에서 메모 전체를 불러와서 상태에 저장
    case 'SET_MEMOS':
      return {
        ...state,
        memos: action.payload,
      };

    // 새로운 메모 추가
    case 'ADD_MEMOS':
      return {
        ...state,
        memos: [action.payload, ...state.memos],
      };

    // 특정 메모 삭제
    case 'DELETE_MEMOS':
      return {
        ...state,
        memos: state.memos.filter(m => m.id !== action.payload),
      };

    // 메모 수정
    case 'UPDATE_MEMOS':
      return {
        ...state,
        memos: state.memos.map(m => m.id === action.payload.id ? action.payload : m),
        editingMemo: null,
      };

    // 수정 모드 진입
    case 'SET_EDITING':
      return {
        ...state,
        editingMemo: action.payload,
      };

    // 검색어 상태 변경
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };

    // 에러 메시지 설정
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
}

function App() {
  // 📌 useReducer 적용
  const [state, dispatch] = useReducer(memoReducer, initialState);

  // 메모 추가 핸들러
  const handleCreate = async (title, content) => {
    try {
      const created = await createMemo({ title, content });
      dispatch({ type: 'ADD_MEMOS', payload: created });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '추가에 실패했습니다' });
    }
  };

  // 메모 삭제 핸들러
  const handleDelete = async (id) => {
    try {
      await deleteMemo(id);
      dispatch({ type: 'DELETE_MEMOS', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '삭제에 실패했습니다' });
    }
  };

  // 메모 수정 핸들러
  const handleUpdate = async (id, changes) => {
    try {
      const updated = await updateMemo(id, changes);
      dispatch({ type: 'UPDATE_MEMOS', payload: updated });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: '수정에 실패했습니다' });
    }
  };

  // 수정 모드 진입
  const handleEditClick = (memo) => {
    dispatch({ type: 'SET_EDITING', payload: memo });
  };

  // 수정 취소
  const handleEditCancelClick = () => {
    dispatch({ type: 'SET_EDITING', payload: null });
  };

  // 메모 검색 핸들러
  const handleSearch = (query) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  // 검색어에 따라 필터링된 메모
  const filteredMemos = state.memos.filter(memo =>
    memo.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
    memo.content.toLowerCase().includes(state.searchQuery.toLowerCase())
  );

  // 렌더링 후 메모 불러오기 (초기 데이터 로딩)
  useEffect(() => {
    const loadMemos = async () => {
      try {
        const data = await getMemos();
        dispatch({ type: 'SET_MEMOS', payload: data.items });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: '메모를 불러오는데 실패했습니다' });
      }
    };
    loadMemos();
  }, []);

  return (
    <>
      <MemoHeader />
      <MemoSearch onSearch={handleSearch} />
      <MemoCreateAndUpdate 
        onCreate={handleCreate} 
        onUpdate={handleUpdate} 
        editingMemo={state.editingMemo}
        onEditCancel={handleEditCancelClick}
      />
      <MemoItemList memos={filteredMemos} onDelete={handleDelete} onEditClick={handleEditClick} />
    </>
  )
}

export default App