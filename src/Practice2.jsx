// 목표: 생략 / 빈 배열 `[]` / 값 지정 `[count]`의 차이를 체험합니다.
// 과제: 아래 3가지 버전을 하나씩 테스트해보세요. 버튼을 5번 클릭했을 때 각각 effect가 몇 번 실행되는지 확인하세요.

import { useState, useEffect } from 'react';

function Practice2() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 🔴 버전 A: deps 생략
  useEffect(() => {
    console.log('🔴 A: deps 생략 - effect 실행!');
  });

  // 🟡 버전 B: 빈 배열 []
  // useEffect(() => {
  //   console.log('🟡 B: 빈 배열 - effect 실행!');
  // }, []);

  // 🟢 버전 C: [count]
  // useEffect(() => {
  //   console.log('🟢 C: [count] - effect 실행! count:', count);
  // }, [count]);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>count +1</button>
      <button onClick={() => setName('React')}>name 변경</button>
    </div>
  );
}

export default Practice2;