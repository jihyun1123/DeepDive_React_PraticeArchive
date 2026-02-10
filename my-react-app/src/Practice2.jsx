// Practice2.jsx
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