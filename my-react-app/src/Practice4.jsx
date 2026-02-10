// 목표 : "오래된 값(stale value)"이 캡처되는 문제를 직접 체험하고 해결합니다.
// 과제 A : 문제 재현
// 아래 코드를 실행하고 3초 동안 기다려보세요. count가 어떻게 되나요?


// Practice4.jsx
import { useState, useEffect } from 'react';

function Practice4() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log('⏰ 현재 count:', count);
      setCount(count + 1);  // 🔴 문제 코드
    }, 1000);

    return () => clearInterval(id);
  }, []);  // deps가 빈 배열!

  return <p>count: {count}</p>;
}

export default Practice4;