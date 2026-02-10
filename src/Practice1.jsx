// ## 목표 : 렌더링과 useEffect의 실행 순서를 눈으로 확인합니다.
// ### 과제 : 아래 코드를 작성하고, 버튼을 클릭하기 전/후 콘솔에 어떤 순서로 출력될지 **먼저 예측**해보세요.

// Practice1.jsx
import { useState, useEffect } from 'react';

function Practice1() {
  const [count, setCount] = useState(0);

  console.log('1️⃣ 렌더링 시작, count:', count);

  useEffect(() => {
    console.log('2️⃣ effect 실행, count:', count);
  }, [count]);  // count가 변경될 때마다 실행

  console.log('3️⃣ 렌더링 끝');

  // 버튼 클릭 시 count 증가
  return (  // cleaned up return statement
    <button onClick={() => setCount(count + 1)}>
      클릭: {count}
    </button>
  );
}

export default Practice1;