// React 컴포넌트 안에서 loadsh 라이브러리를직접 사용해서 배열과 객체 처리 및 출력

import _ from "lodash"; // lodash 라이브러리 임포트

function App() {

  // lodash 함수 1
  const numbers = [1, 2, 3, 4, 5];  // 원본 배열
  const reversed = _.reverse([...numbers]); // 배열 복사 후 역순으로 변환
  console.log("reverse:", reversed); // 역순 배열 출력

  // lodash 함수 2
  const users = [ // 사용자 객체 배열
    { id: 1, name: "철수" },
    { id: 2, name: "영희" }
  ];
  const foundUser = _.find(users, { name: "영희" }); // 이름이 "영희"인 사용자 찾기
  console.log("find:", foundUser); // 찾은 사용자 출력

  // JSX 반환 부분 ( 화면에 보이는 부분 )
  // 실제 브라우저에 표시되는 UI, lodash 결과는 화면이 아니라 콘솔에 출력
  return ( 
    <div>
      <h1>Vite + React + Lodash</h1>
      <p>콘솔을 확인하세요</p>
    </div>
  );
}

export default App; // App 컴포넌트 내보내기
