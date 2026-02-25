import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MemoCreateAndUpdate from "../components/MemoCreateAndUpdate.jsx";
import { createMemo, getMemo, updateMemo } from "../api/memos";
import "./MemoFormPage.css";

export default function MemoFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [editingMemo, setEditingMemo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isEditMode) {
      setEditingMemo(null);
      return;
    }

    const loadMemo = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getMemo(id);
        setEditingMemo(data);
      } catch (err) {
        setError("메모를 불러오는데 실패했습니다");
      } finally {
        setIsLoading(false);
      }
    };

    loadMemo();
  }, [id, isEditMode]);

  const handleCreate = async (title, content) => {
    try {
      const created = await createMemo({ title, content });
      navigate(`/memos/${created.id}`);
    } catch (err) {
      setError("추가에 실패했습니다");
    }
  };

  const handleUpdate = async (memoId, changes) => {
    try {
      const updated = await updateMemo(memoId, changes);
      navigate(`/memos/${updated.id}`);
    } catch (err) {
      setError("수정에 실패했습니다");
    }
  };

  const handleCancel = () => {
    if (isEditMode) {
      navigate(`/memos/${id}`);
      return;
    }
    navigate("/");
  };

  const canRenderForm = !isEditMode || Boolean(editingMemo);

  return (
    <section className="memo-form-page">
      {isLoading && <p className="memo-form-status">로딩 중...</p>}
      {error && <p className="memo-form-status">❌ {error}</p>}
      {!isLoading && !error && !canRenderForm && (
        <p className="memo-form-status">수정할 메모를 찾을 수 없습니다.</p>
      )}
      {!isLoading && canRenderForm && (
        <MemoCreateAndUpdate
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          editingMemo={editingMemo}
          onEditCancel={handleCancel}
        />
      )}
    </section>
  );
}
