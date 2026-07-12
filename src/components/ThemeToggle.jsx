import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/uiSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => dispatch(toggleTheme())}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {isDark ? "☀" : "☾"}
    </button>
  );
}
