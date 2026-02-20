import { useReducer, useEffect } from 'react'
import './App.css'
import MemoCreateAndUpdate from './components/memoCreateAndUpdate.jsx'
import MemoHeader from './components/MemoHeader'
import MemoItemList from './components/ItemListMemo'
import MemoSearch from './components/MemoSearch'
import ToggleButton from './components/ToggleButton.jsx'

// API 함수들 임포트
import { createMemo, deleteMemo, getMemos, updateMemo } from './api/memos'

// 📌 initialState 정의
const initialState = {
  memos: [],
  editingMemo: null,
  error: null,
  searchQuery: '', // 검색어 상태 추가
};

// 📌 reducer 함수 정의
function memoReducer(state, action) {
  switch (action.type) {
    // 서버에서 메모 전체를 불러와서 상태에 저장
    case 'SET_MEMOS':
      return {
        ...state, // 기존 상태 유지
        memos: action.payload,  // 서버에서 불러온 메모 리스트로 상태 업데이트
      };

    // 새로운 메모 추가
    case 'ADD_MEMOS':
      return {
        ...state,
        memos: [action.payload, ...state.memos],  // 새 메모를 맨 앞에 추가
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
        // 수정된 메모로 기존 메모 리스트 업데이트
        // action.payload.id와 일치하는 메모는 action.payload로 대체, 나머지는 그대로 유지
        // 여기서 action.payload는 수정된 메모이다 (예: { id: 1, title: '수정된 제목', content: '수정된 내용' })
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
  // async는 함수 앞에 사용하며 자동으로 Promise를 반환한다
  // await는 Promise가 처리될 때까지 대기했다가 결과값을 반환한다
  const handleCreate = async (title, content) => {
    try {
      const created = await createMemo({ title, content }); // API 호출하여 메모 생성
      // created는 API에서 반환된 새 메모 객체 (예: { id: 1, title: '제목', content: '내용' })
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
  // query는 검색어 문자열이다
  const handleSearch = (query) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  };

  // 검색어에 따라 필터링된 메모
  // state.searchQuery가 변경될 때마다 filteredMemos가 재계산된다
  // 메모의 제목이나 내용에 검색어가 포함되어 있는지 확인하여 필터링
  // toLowerCase()를 사용하여 대소문자 구분 없이 검색할 수 있도록 한다
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
      <ToggleButton />
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