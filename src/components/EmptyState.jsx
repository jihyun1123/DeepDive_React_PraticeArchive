// 빈 상태를 표시하는 컴포넌트

import './EmptyState.css';

function EmptyState(){
  return(
    <div className="empty-state">
      <p className="empty">할 일이 없습니다. 새로운 할 일을 추가해보세요!</p>
    </div>
  )
}
export default EmptyState;