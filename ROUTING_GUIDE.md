# React Router 적용 완료 문서

## 📋 구현 현황

### 1단계 ✅ 패키지 설치 및 BrowserRouter 설정
- `react-router-dom` v6.30.0 설치 완료
- `main.jsx`에 `BrowserRouter` 래퍼 적용
  - `ThemeProvider` 위에 `BrowserRouter` 감싸서 전체 앱에 라우팅 기능 제공

### 2단계 ✅ 파일 구조 설계
생성된 폴더 및 파일:
```
src/
├── pages/
│   ├── MemoListPage.jsx        # 메모 목록 (검색, 필터, 페이지네이션)
│   ├── MemoListPage.css
│   ├── MemoDetailPage.jsx       # 메모 상세 조회
│   ├── MemoDetailPage.css
│   ├── MemoFormPage.jsx         # 메모 작성/수정 (겸용)
│   ├── MemoFormPage.css
│   ├── NotFoundPage.jsx         # 404 페이지
│   └── NotFoundPage.css
├── components/
│   ├── Layout.jsx               # 공통 레이아웃 (헤더, 네비, Outlet)
│   ├── Layout.css
│   └── (기존 컴포넌트들 유지)
└── (기타 파일들)
```

### 3단계 ✅ App.jsx에 Routes 구성
라우트 구조:
```
/                        → Layout (공통 레이아웃)
├── /                    → MemoListPage (메모 목록)
├── /memos/new           → MemoFormPage (새 메모 작성)
├── /memos/:id           → MemoDetailPage (메모 상세)
├── /memos/:id/edit      → MemoFormPage (메모 수정)
└── /*                   → NotFoundPage (404)
```

### 4단계 ✅ MemoListPage 구현
**기능:**
- URL 쿼리스트링 (`useSearchParams`) 활용
  - `?q=검색어` - 검색어 저장
  - `?page=2` - 페이지 번호 저장
- 검색 상태 유지 + 페이지네이션
- 페이지당 6개 메모 표시 (설정 가능)

**주요 특징:**
- 검색 중에도 URL이 업데이트되어 북마크 가능
- 새로고침 시 이전 상태 복원
- 페이지 범위 초과 시 자동으로 유효 범위 조정

### 5단계 ✅ Link / NavLink 연결
**Layout.jsx:**
- `NavLink`로 내비게이션 메뉴 구성
- `is-active` 클래스로 현재 경로 강조 표시

**ItemListMemo.jsx:**
- 메모 제목을 `<Link>`로 감싸서 상세 페이지로 이동
- 수정 버튼도 `<Link>`로 변경하여 `/memos/:id/edit` 이동

### 6단계 ✅ MemoDetailPage 구현
**기능:**
- `useParams()`로 URL의 `:id` 추출
- `getMemo(id)` API 호출로 단일 메모 조회
- 삭제 시 `useNavigate()`로 목록 페이지로 리다이렉트

**UI:**
- 메모 제목, 내용 표시
- 목록/수정/삭제 버튼 제공
- 로딩 상태, 에러 상태 처리

### 7단계 ✅ MemoFormPage 구현
**기능:**
- `useParams()`의 `id` 유무로 작성/수정 모드 자동 분기
- 수정 모드: 기존 데이터를 폼에 로드
- 작성/수정 완료 후 상세 페이지로 리다이렉트
- 취소 시:
  - 수정 모드: 상세 페이지로 돌아가기
  - 작성 모드: 목록 페이지로 돌아가기

### 8단계 ✅ Layout 컴포넌트 분리
**특징:**
- 모든 페이지의 공통 레이아웃 제공
- 헤더, 네비게이션, 테마 토글 버튼 포함
- `<Outlet />`으로 각 페이지 컴포넌트 렌더링
- 중첩 라우트 구조로 레이아웃 재렌더링 방지

---

## 🔌 API 함수 추가

`src/api/memos.js`에 단일 메모 조회 함수 추가:
```javascript
export const getMemo = async (id) => {
  const response = await client.get(`/memos/${id}`);
  return response.data;
};
```

---

## 🚀 개발 서버 실행

```bash
npm install          # 의존성 설치
npm run dev          # 개발 서버 시작 (http://localhost:3000)
```

---

## 📱 라우팅 테스트 방법

| 페이지 | URL | 테스트 방법 |
|--------|-----|----------|
| 목록 | `/` | 검색, 필터, 페이지네이션 확인 |
| 작성 | `/memos/new` | 새 메모 작성 후 상세 페이지로 리다이렉트 |
| 상세 | `/memos/1` | 메모 조회, 수정/삭제 버튼 클릭 |
| 수정 | `/memos/1/edit` | 기존 데이터 로드 후 수정 |
| 404 | `/invalid-path` | 404 페이지 표시 |

---

## 💡 주요 라우터 개념

### useParams
```javascript
const { id } = useParams(); // URL의 동적 매개변수 추출
```

### useNavigate
```javascript
const navigate = useNavigate();
navigate("/"); // 프로그래밍 방식 네비게이션
```

### useSearchParams
```javascript
const [searchParams, setSearchParams] = useSearchParams();
const query = searchParams.get("q"); // 쿼리스트링 읽기
setSearchParams({ q: "새검색어", page: "2" }); // 쿼리스트링 설정
```

### Link / NavLink
```javascript
<Link to="/memos/1">상세보기</Link>              // 기본 링크
<NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
  메뉴
</NavLink>                                        // 활성화 스타일 자동 적용
```

---

## 📦 파일 구조 최종본

```
Memo-re-app/
├── src/
│   ├── pages/
│   │   ├── MemoListPage.jsx
│   │   ├── MemoListPage.css
│   │   ├── MemoDetailPage.jsx
│   │   ├── MemoDetailPage.css
│   │   ├── MemoFormPage.jsx
│   │   ├── MemoFormPage.css
│   │   ├── NotFoundPage.jsx
│   │   └── NotFoundPage.css
│   ├── api/
│   │   ├── client.js
│   │   └── memos.js (getMemo 추가)
│   ├── components/
│   │   ├── Layout.jsx
│   │   ├── Layout.css
│   │   ├── MemoHeader.jsx
│   │   ├── MemoHeader.css
│   │   ├── MemoSearch.jsx
│   │   ├── MemoSearch.css
│   │   ├── MemoCreateAndUpdate.jsx
│   │   ├── memoCreateAndUpdate.css
│   │   ├── ItemListMemo.jsx
│   │   ├── ItemListMemo.css
│   │   ├── DeleteMemo.jsx
│   │   ├── ToggleButton.jsx
│   │   ├── ToggleButton.css
│   │   └── ThemeContext.jsx
│   ├── App.jsx (라우터 기반 리팩토링)
│   ├── main.jsx (BrowserRouter 적용)
│   └── ...
├── package.json (react-router-dom 추가)
└── ...
```

---

## ✨ 적용된 기술 스택

- **React Router v6** - 라우팅 및 네비게이션
- **useRouter Hooks:**
  - `useParams()` - URL 파라미터 추출
  - `useNavigate()` - 프로그래밍 방식 네비게이션
  - `useSearchParams()` - 쿼리스트링 관리
- **Link / NavLink** - 선언적 네비게이션
- **Nested Routes + Outlet** - 레이아웃 구조
