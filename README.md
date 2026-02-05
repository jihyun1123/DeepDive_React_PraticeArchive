# React 할일목록 (Todo List) 앱

React와 Vite를 사용한 할일 관리 애플리케이션

## 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev


## 컴포넌트 구조

이 앱은 총 6개의 컴포넌트로 구성되어 있으며, 각각의 역할이 명확히 분리되어 있습니다:

- **App**: 최상위 컴포넌트로, 모든 할일 데이터(todos)를 state로 관리하고 하위 컴포넌트들을 렌더링합니다.
- **Header**: 애플리케이션의 제목과 설명을 표시하는 순수 표현 컴포넌트입니다.
- **TodoForm**: 새로운 할일을 입력받아 추가하는 폼 컴포넌트로, 내부에서 입력값을 관리하는 로컬 state를 가지고 있습니다.
- **Stats**: 전체 할일 중 완료된 항목의 개수와 비율을 계산하여 표시하는 통계 컴포넌트입니다.
- **TodoList**: todos 배열을 받아서 각 할일을 TodoItem으로 렌더링하며, 할일이 없을 경우 EmptyState를 보여줍니다.
- **TodoItem**: 개별 할일 항목을 렌더링하고, 체크박스 토글 및 삭제 버튼 이벤트를 처리합니다.
- **EmptyState**: 할일 목록이 비어있을 때 사용자에게 안내 메시지를 표시합니다.

## 상태(State) 관리

### App 컴포넌트의 중앙 집중식 상태 관리

모든 할일 데이터는 **App 컴포넌트**에서 `useState`를 통해 관리됩니다:

```jsx
const [todos, setTodos] = useState([
  { id: 1, text: '리액트 공부하기', completed: false },
  { id: 2, text: '점심 먹기', completed: true },
  { id: 3, text: '운동하기', completed: false },
]);
```

- **todos**: 모든 할일 객체들의 배열 (id, text, completed 속성 포함)
- **setTodos**: todos 상태를 업데이트하는 함수

### Props를 통한 데이터 전달

- **TodoForm**: `onAdd` props로 할일 추가 함수를 받아서 사용
- **TodoList**: `todos`, `onToggle`, `onDelete` props로 데이터와 이벤트 핸들러를 받음
- **TodoItem**: 개별 `todo` 객체와 `onToggle`, `onDelete` 함수를 props로 받음
- **Stats**: `todos` 배열을 받아서 통계를 계산

### 로컬 상태 관리

TodoForm 컴포넌트는 입력 필드의 값을 관리하기 위해 자체적인 로컬 state를 사용합니다:

```jsx
const [input, setInput] = useState('');
```

## 불변성 업데이트 예시

React에서는 state를 직접 수정하지 않고, **새로운 객체/배열을 생성**하여 업데이트해야 합니다.

### 예시: 할일 완료 상태 토글 (toggleTodo)

```jsx
const toggleTodo = (id) => {
  setTodos(prev => prev.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
};
```

**불변성이 지켜지는 이유:**

1. **원본 배열을 직접 수정하지 않음**: `prev.map()`을 사용하여 새로운 배열을 생성합니다.
2. **스프레드 연산자 사용**: `{ ...todo, completed: !todo.completed }`는 기존 todo 객체를 복사하고, completed 속성만 변경한 **새로운 객체**를 만듭니다.
3. **조건부 업데이트**: `todo.id === id`인 경우에만 새 객체를 생성하고, 나머지는 기존 todo를 그대로 반환합니다.

이렇게 불변성을 유지하면 React가 변경사항을 정확히 감지하여 효율적으로 리렌더링할 수 있습니다.

## 주요 기능

- ✅ 할일 추가
- ✅ 할일 완료 체크/해제
- ✅ 할일 삭제
- ✅ 완료 통계 표시
- ✅ 빈 목록 안내 메시지

## 기술 스택

- React 18
- Vite
- CSS (CSS Modules 사용하지 않음)

