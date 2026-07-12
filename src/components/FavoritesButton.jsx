import { useSelector } from "react-redux";

export default function FavoritesButton({ onOpen }) {
  const count = useSelector((s) => s.favorites.ids.length);
  return (
    <button
      type="button"
      className="fav-open"
      onClick={onOpen}
      aria-label="Open favorites"
    >
      <span aria-hidden="true">♥</span> Favorites
      {count > 0 && <span className="fav-open__count">{count}</span>}
    </button>
  );
}
