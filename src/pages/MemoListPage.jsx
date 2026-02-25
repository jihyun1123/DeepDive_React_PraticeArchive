import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MemoSearch from "../components/MemoSearch";
import MemoItemList from "../components/ItemListMemo";
import { deleteMemo, getMemos } from "../api/memos";
import "./MemoListPage.css";

const PAGE_SIZE = 6;

export default function MemoListPage() {
  const [memos, setMemos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("q") ?? "";
  const rawPage = Number.parseInt(searchParams.get("page") ?? "1", 10);
  const pageParam = Number.isNaN(rawPage) ? 1 : rawPage;
  const [input, setInput] = useState(query);

  useEffect(() => {
    setInput(query);
  }, [query]);

  const loadMemos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMemos();
      const items = Array.isArray(data?.items) ? data.items : data;
      setMemos(Array.isArray(items) ? items : []);
    } catch (err) {
      setError("메모를 불러오는데 실패했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMemos();
  }, []);

  const filteredMemos = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return memos;
    return memos.filter((memo) => {
      return (
        memo.title.toLowerCase().includes(normalized) ||
        memo.content.toLowerCase().includes(normalized)
      );
    });
  }, [memos, query]);

  const totalPages = Math.max(1, Math.ceil(filteredMemos.length / PAGE_SIZE));
  const safePage = Math.min(Math.max(pageParam, 1), totalPages);

  useEffect(() => {
    if (safePage !== pageParam) {
      setSearchParams(buildParams(query, safePage));
    }
  }, [pageParam, query, safePage, setSearchParams]);

  const pagedMemos = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;
    return filteredMemos.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredMemos, safePage]);

  const handleSearch = (value) => {
    setSearchParams(buildParams(value, 1));
  };

  const handlePageChange = (nextPage) => {
    setSearchParams(buildParams(query, nextPage));
  };

  const handleDelete = async (id) => {
    try {
      await deleteMemo(id);
      setMemos((prev) => prev.filter((memo) => memo.id !== id));
    } catch (err) {
      setError("삭제에 실패했습니다");
    }
  };

  return (
    <>
      <MemoSearch
        value={input}
        onChange={setInput}
        onSearch={handleSearch}
      />
      <MemoItemList
        memos={pagedMemos}
        onDelete={handleDelete}
        isLoading={isLoading}
        error={error}
        onRefetch={loadMemos}
      />
      <div className="memo-pagination">
        <button
          type="button"
          onClick={() => handlePageChange(safePage - 1)}
          disabled={safePage <= 1}
        >
          이전
        </button>
        <span>
          {safePage} / {totalPages}
        </span>
        <button
          type="button"
          onClick={() => handlePageChange(safePage + 1)}
          disabled={safePage >= totalPages}
        >
          다음
        </button>
      </div>
    </>
  );
}

function buildParams(nextQuery, nextPage) {
  const params = {};
  if (nextQuery && nextQuery.trim()) {
    params.q = nextQuery.trim();
  }
  if (nextPage && Number(nextPage) > 1) {
    params.page = String(nextPage);
  }
  return params;
}
