// todos 배열을 받아서 완료된 항목 수와 전체 항목 수를 계산하여 출력

import './Stats.css';

function Stats({todos, completedCount}) {
  const totalCount = todos.length;
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return(
    <div className='stats-section'>
      <p>완료: {completedCount} / {totalCount} ({percent}%)</p>
    </div>
  )

}
export default Stats;