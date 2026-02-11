# 📝 메모 관리 앱 (React + Axios + CRUD)

React와 Axios를 이용한 메모 CRUD 프로젝트입니다. 메모 생성, 조회, 수정, 삭제 기능과 다양한 확장 기능을 포함합니다.

---

## 📂 API 파일 구조

### `src/api/client.jsx`
**역할:** Axios 인스턴스 설정 및 관리
```jsx
import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',  // 백엔드 서버 기본 URL
});

export default client;
```
- 모든 API 요청의 기본 설정을 담당
- baseURL을 중앙에서 관리하여 유지보수 용이

### `src/api/memos.jsx`
**역할:** 메모 관련 API 엔드포인트 함수 제공
```jsx
// 목록 조회 (검색, 정렬, 페이지네이션 지원)
export const getMemos = async (params = {}) => {
  const response = await client.get('/memos', { params });
  return response.data;
};

// 생성, 수정, 삭제 함수들도 정의
```

- **params 객체**: 다음 옵션을 지원합니다
  - `q`: 검색어
  - `page`: 현재 페이지
  - `limit`: 페이지당 메모 개수
  - `sort`: 정렬 필드 (createdAt, updatedAt, title)
  - `order`: 정렬 순서 (asc, desc)

---

## 🎨 상태 UI 설명

### 로딩 상태 (Loading)
**조건:** `isLoading === true`
```jsx
{isLoading && <p>로딩 중...</p>}
```
**시점:**
- 메모 목록 불러올 때
- 페이지 변경할 때
- 정렬 변경할 때

### 에러 상태 (Error)
**조건:** `error !== null && !isLoading`
```jsx
{error && (
  <div>
    <p>에러: {error}</p>
    <button onClick={onRetry}>다시 시도</button>
  </div>
)}
```
**시점:**
- API 요청 실패
- 네트워크 오류
- 서버 에러 응답

### 빈 상태 (Empty)
**조건:** `!isLoading && !error && memos.length === 0`
```jsx
{!isLoading && !error && memos.length === 0 && (
  <>
    <p>메모가 없습니다. 첫 메모를 작성해보세요!</p>
    <button onClick={onCreate}>첫 메모 작성</button>
  </>
)}
```
**시점:**
- 메모가 1개도 없을 때
- 검색 결과가 없을 때

### 정상 상태 (Data)
**조건:** `!isLoading && !error && memos.length > 0`
- 메모 목록 렌더링
- 일괄 삭제 버튼 표시
- 각 메모의 개별 삭제 버튼 표시

---

## 🔧 CRUD 구현 설명

### Create (생성) - `handleCreate`
```jsx
const handleCreate = async (payload) => {
  try {
    const newMemo = await createMemo(payload);
    setMemos((prev) => [newMemo, ...prev]);  // 맨 앞에 추가
  } catch (err) {
    setError('추가에 실패했습니다');
  }
};
```
**상태 변화:**
1. 새 메모 객체가 API에서 반환됨
2. `setMemos`에서 **배열 맨 앞에 삽입** → 최신순 표시
3. 화면에 새 메모가 즉시 표시

### Read (조회) - `fetchMemos`
```jsx
const fetchMemos = async (param = {}) => {
  setIsLoading(true);
  try {
    const data = await getMemos({
      ...param,
      page: currentPage,
      sort: sortField,
      order: sortOrder,
      limit: 7,  // 페이지당 7개
    });
    setMemos(data.items);
    setTotalPages(data.totalPages);
  } catch(err) {
    setError(err.message);
  } finally {
    setIsLoading(false);
  }
};
```
**상태 변화:**
1. `isLoading = true` → 로딩 UI 표시
2. API에서 메모 목록 및 총 페이지 수 받음
3. `setMemos(data.items)` → 메모 목록 업데이트
4. `setTotalPages(data.totalPages)` → 페이지네이션 정보 저장
5. `isLoading = false` → 로딩 UI 숨김

### Update (수정) - `handleUpdate`
```jsx
const handleUpdate = async (id, changes) => {
  try {
    const updated = await updateMemo(id, changes);
    setMemos((prev) => prev.map((memo) => 
      memo.id === id ? updated : memo
    ));  // map 패턴으로 해당 항목만 교체
  } catch (err) {
    setError('수정에 실패했습니다');
  }
};
```
**상태 변화:**
1. 수정할 메모의 ID로 업데이트 API 호출
2. 반환된 수정된 메모 객체 받음
3. **map 패턴**: 해당 ID의 메모만 업데이트, 나머지는 유지
4. 화면에 수정된 내용 즉시 반영

### Delete (삭제) - `handleDelete` (개별 삭제)
```jsx
const handleDelete = async (id) => {
  try {
    await deleteMemo(id);
    setMemos(prev => prev.filter(memo => memo.id !== id));  // filter 패턴
  } catch (err) {
    setError('삭제에 실패했습니다');
  }
};
```
**상태 변화:**
1. 삭제 API 호출
2. **filter 패턴**: 해당 ID의 메모를 제외한 배열 반환
3. 화면에서 메모 즉시 삭제

### Delete (일괄 삭제) - `handleBatchDelete`
```jsx
const handleBatchDelete = async () => {
  try {
    await Promise.all(selectedIds.map(id => deleteMemo(id)));
    setMemos(prev => prev.filter(memo => !selectedIds.includes(memo.id)));
    setSelectedIds([]);
  } catch(err) {
    setError('일괄 삭제에 실패했습니다');
  }
};
```
**상태 변화:**
1. 선택된 모든 메모 ID에 대해 동시에 삭제 요청 (`Promise.all`)
2. filter로 선택된 메모들 제거
3. `selectedIds` 초기화하여 체크박스 해제

---

## ✨ 확장 기능 수행한 것

### 1. **재시도 버튼**
```jsx
const refetch = () => {
  fetchMemos({ q: searchQuery });
};
```
- 에러 상태에서 "다시 시도" 버튼으로 API 재호출
- 검색어 유지하면서 재조회

### 2. **빈 상태 유도 (Empty State UI)**
```jsx
{!isLoading && !error && memos.length === 0 && (
  <>
    <p>메모가 없습니다. 첫 메모를 작성해보세요!</p>
    <button onClick={onCreate}>첫 메모 작성</button>
  </>
)}
```
- 메모가 없을 때 친화적인 메시지와 행동 유도 버튼 제공

### 3. **페이지네이션**
```jsx
// MemoSort.jsx & Pagination.jsx
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);

const handlePageChange = (page) => {
  setCurrentPage(page);
};
```
- 페이지당 **7개의 메모만 표시**
- 이전/다음 버튼 및 페이지 번호 버튼 제공
- 페이지 변경 시 useEffect의 dependency에 포함되어 자동 재조회

### 4. **정렬 기능**
```jsx
// MemoSort.jsx
const [sortField, setSortField] = useState('createdAt');  // 기본값
const [sortOrder, setSortOrder] = useState('desc');       // 내림차순

const handleSortDayChange = (field, order) => {
  setSortField(field);
  setSortOrder(order);
  setCurrentPage(1);  // 첫 페이지로 리셋
};
```
**정렬 옵션:**
- **필드**: 생성일 (createdAt), 수정일 (updatedAt), 제목 (title)
- **순서**: 오름차순 (asc), 내림차순 (desc)
- **동작**: 정렬 변경 후 자동으로 `fetchMemos` 재호출, 첫 페이지로 리셋

### 5. **검색 기능**
```jsx
// MemoSearch.jsx
const handleSearch = (query) => {
  setSearchQuery(query);
};
```
- 검색어 입력 시 자동으로 필터링
- `getMemos({ q: searchQuery })` 파라미터로 전달

### 6. **체크박스 선택 및 일괄 삭제**
```jsx
const [selectedIds, setSelectedIds] = useState([]);

const handleSelect = (id) => {
  setSelectedIds(prev => 
    prev.includes(id) 
      ? prev.filter(i => i !== id)
      : [...prev, id]
  );
};
```
- 메모 별 체크박스로 선택
- "선택된 N개 삭제" 버튼으로 일괄 삭제
- 선택된 항목이 없으면 버튼 비활성화

---

## 🏗️ 컴포넌트 구조

```
App.jsx (상태 관리 중심)
├── MemoSearch (검색 UI)
├── MemoContent (메모 목록 렌더링)
│   ├── MemoCreate (메모 생성 폼)
│   ├── MemoSort (정렬 필드/순서 선택)
│   │   └── Pagination (페이지네이션)
│   ├── MemoUpdate (메모 수정 폼)
│   └── 메모 목록 렌더링
└── API 호출 핸들러들
```

---

## 🚀 주요 특징

- ✅ **완전한 CRUD 구현**: 생성, 조회, 수정, 삭제
- ✅ **검색 + 정렬 + 페이지네이션**: 대량의 데이터 효율적 관리
- ✅ **상태별 UI**: 로딩, 에러, 빈 상태 각각 처리
- ✅ **재시도 기능**: 네트워크 실패 시 재시도 버튼
- ✅ **일괄 삭제**: 체크박스로 여러 메모 동시 삭제
- ✅ **모던 React 패턴**: 
  - `map()`: Update에서 해당 항목만 교체
  - `filter()`: Delete에서 항목 제거
  - `Promise.all()`: 일괄 삭제 시 동시 처리
