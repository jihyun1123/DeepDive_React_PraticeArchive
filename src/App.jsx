import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import MemoDetailPage from "./pages/MemoDetailPage";
import MemoFormPage from "./pages/MemoFormPage";
import MemoListPage from "./pages/MemoListPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MemoListPage />} />
        <Route path="memos/new" element={<MemoFormPage />} />
        <Route path="memos/:id" element={<MemoDetailPage />} />
        <Route path="memos/:id/edit" element={<MemoFormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;