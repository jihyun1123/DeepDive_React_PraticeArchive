import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <section className="notfound">
      <h2>404</h2>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/">목록으로 돌아가기</Link>
    </section>
  );
}
