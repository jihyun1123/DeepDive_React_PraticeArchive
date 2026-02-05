// todos 배열을 받아서 완료된 항목 수와 전체 항목 수를 계산하여 출력

import './Stats.css';

function Stats({ todos }) {
  // 완료된 항목 수 계산
  const completedCount = todos.filter(todo => todo.completed).length;
  // 전체 항목 수 계산
  const totalCount = todos.length;

  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    // 완료된 항목 수 / 전체 항목 수 출력
    <div className="stats">완료: {completedCount}/{totalCount} ({percent}%)</div>
  );
}

export default Stats;