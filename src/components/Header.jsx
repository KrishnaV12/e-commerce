import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setMinRating,
  setSort,
  resetFilters,
} from "../features/filtersSlice";
import { CATEGORIES } from "../api/mockApi";
import ThemeToggle from "./ThemeToggle";
import FavoritesButton from "./FavoritesButton";

export default function Header({ onOpenFavorites }) {
  const dispatch = useDispatch();
  const { category, minRating, sort } = useSelector((s) => s.filters);

  return (
    <header className="appbar">
      <div className="header-inner">
        <span className="brand">
          <span className="brand__name">E-Commerce Listing</span>
        </span>

        <select
          className="control"
          aria-label="Category"
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="All">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="control"
          aria-label="Minimum rating"
          value={minRating}
          onChange={(e) => dispatch(setMinRating(Number(e.target.value)))}
        >
          <option value={0}>Any rating</option>
          <option value={3}>3.0 ★ &amp; up</option>
          <option value={4}>4.0 ★ &amp; up</option>
          <option value={4.5}>4.5 ★ &amp; up</option>
        </select>

        <select
          className="control"
          aria-label="Sort by price"
          value={sort}
          onChange={(e) => dispatch(setSort(e.target.value))}
        >
          <option value="none">Featured</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
        </select>

        <button
          type="button"
          className="link-btn"
          onClick={() => dispatch(resetFilters())}
        >
          Reset
        </button>

        <div className="actions">
          <ThemeToggle />
          <FavoritesButton onOpen={onOpenFavorites} />
        </div>
      </div>
    </header>
  );
}
