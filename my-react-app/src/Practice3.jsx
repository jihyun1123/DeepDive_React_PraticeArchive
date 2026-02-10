// ### 목표 cleanup 함수가 **언제** 실행되는지 직접 확인합니다.
// ### 과제 아래 코드를 작성하고, 버튼을 3번 클릭해보세요. cleanup이 언제 실행되는지 콘솔을 관찰하세요.

// Practice3.jsx
import { useState, useEffect } from 'react';

function Practice3() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('✅ effect 실행! count:', count);

    return () => {
      console.log('🧹 cleanup 실행! count:', count);
    };
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      클릭: {count}
    </button>
  );
}

export default Practice3;