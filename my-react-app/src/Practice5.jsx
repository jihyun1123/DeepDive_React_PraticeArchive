// Practice5.jsx
import { useState, useEffect } from 'react';

function Practice5() {
  const [show, setShow] = useState(true);

  return (
    <div>
      <button onClick={() => setShow(!show)}>
        {show ? '숨기기' : '보이기'}
      </button>
      {show && <Counter />}
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
  console.log('🚀 타이머 시작!');
  const id = setInterval(() => {
    setCount(prev => prev + 1);
  }, 1000);

  return () => {
    console.log('🧹 타이머 정리!');
    clearInterval(id);
  };
}, []);

  return <p>count: {count}</p>;
}

export default Practice5;