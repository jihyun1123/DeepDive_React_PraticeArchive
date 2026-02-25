import { NavLink, Outlet } from "react-router-dom";
import MemoHeader from "./MemoHeader";
import ToggleButton from "./ToggleButton";
import "./Layout.css";

export default function Layout() {
  return (
    <>
      <MemoHeader />
      <ToggleButton />
      <nav className="memo-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `memo-nav-link${isActive ? " is-active" : ""}`
          }
        >
          목록
        </NavLink>
        <NavLink
          to="/memos/new"
          className={({ isActive }) =>
            `memo-nav-link${isActive ? " is-active" : ""}`
          }
        >
          새 메모
        </NavLink>
      </nav>
      <main className="memo-page">
        <Outlet />
      </main>
    </>
  );
}
