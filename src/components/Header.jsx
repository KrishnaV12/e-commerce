import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setMinRating,
  setSort,
  resetFilters,
  saleToggle,
} from "../features/filtersSlice";
import { CATEGORIES } from "../api/mockApi";
import ThemeToggle from "./ThemeToggle";
import FavoritesButton from "./FavoritesButton";

export default function Header({ onOpenFavorites }) {
  const dispatch = useDispatch();
  const { category, minRating, sort } = useSelector((s) => s.filters);

  return (
    <header className="appbar">
      <div className="header">
        <div className="header-inner">
          <span className="brand">
            <span className="brand__name">E-Commerce Listing</span>
          </span>
          <div className="actions">
            <ThemeToggle />
            <FavoritesButton onOpen={onOpenFavorites} />
          </div>
        </div>
      </div>
      <div className="header-filters">
        <div className="field">
          <label className="field-label" htmlFor="categories">
            Categories
          </label>
          <select
            id="categories"
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
        </div>
        <div className="field">
          <label className="field-label" htmlFor="rating">
            Rating
          </label>
          <select
            id="rating"
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
        </div>
        <div className="field">
          <label className="field-label" htmlFor="Sort By">
            Sort By
          </label>
          <select
            id="Sort By"
            className="control"
            aria-label="Sort by price"
            value={sort}
            onChange={(e) => dispatch(setSort(e.target.value))}
          >
            <option value="none">Featured</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </div>
        <div className="field">
        
          <button
            type="button"
            className="link-btn"
            onClick={() => dispatch(resetFilters())}
          >
            Reset
          </button>

          
        </div>
         <div className="field">
        
          <button
            type="button"
            className="link-btn"
            onClick={() => dispatch(saleToggle())}
          >
            SaleToggle
          </button>

          
        </div>
      </div>
    </header>
  );
}
