import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMemo, getMemo } from "../api/memos";
import "./MemoDetailPage.css";

export default function MemoDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [memo, setMemo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMemo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMemo(id);
        setMemo(data);
      } catch (err) {
        setError("메모를 불러오는데 실패했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      loadMemo();
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm("정말 이 메모를 삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteMemo(id);
      navigate("/");
    } catch (err) {
      setError("삭제에 실패했습니다");
    }
  };

  if (isLoading) {
    return <p className="memo-detail-status">로딩 중...</p>;
  }

  if (error) {
    return <p className="memo-detail-status">❌ {error}</p>;
  }

  if (!memo) {
    return <p className="memo-detail-status">메모를 찾을 수 없습니다.</p>;
  }

  return (
    <section className="memo-detail">
      <div className="memo-detail-header">
        <h2>{memo.title}</h2>
        <div className="memo-detail-actions">
          <Link className="memo-detail-link" to="/">
            목록
          </Link>
          <Link className="memo-detail-link" to={`/memos/${memo.id}/edit`}>
            수정
          </Link>
          <button type="button" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>
      <p>{memo.content}</p>
    </section>
  );
}
