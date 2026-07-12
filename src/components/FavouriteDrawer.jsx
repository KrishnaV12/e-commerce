import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, clearFavorites } from "../features/favouriteSlice";
import { getProductsByIds } from "../api/mockApi";
import LazyImage from "./LazyImage";

export default function FavoritesDrawer({ open, onClose }) {
  const dispatch = useDispatch();
  const ids = useSelector((s) => s.favorites.ids);
  const favorites = getProductsByIds(ids);

  // Close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className={`drawer-backdrop ${open ? "is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`drawer ${open ? "is-open" : ""}`}
        role="dialog"
        aria-label="Favorites"
        aria-modal="true"
      >
        <header className="drawer__head">
          <h2 className="drawer__title">♥ Your favorites</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        {favorites.length === 0 ? (
          <div className="drawer__empty">
            <p>No favorites yet.</p>
            <p className="muted">
              Tap the heart on any product to save it here.
            </p>
          </div>
        ) : (
          <>
            <div className="drawer__list">
              {favorites.map((p) => (
                <div className="fav-item" key={p.id}>
                  <div className="fav-item__thumb">
                    <LazyImage src={p.image} alt={p.name} />
                  </div>
                  <div className="fav-item__info">
                    <span className="fav-item__name">{p.name}</span>
                    <span className="fav-item__meta">
                      ${p.price.toFixed(2)} · ★ {p.rating.toFixed(1)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="fav-item__remove"
                    onClick={() => dispatch(toggleFavorite(p.id))}
                    aria-label={`Remove ${p.name} from favorites`}
                  >
                    ♥
                  </button>
                </div>
              ))}
            </div>
            <footer className="drawer__foot">
              <button
                type="button"
                className="link-btn"
                onClick={() => dispatch(clearFavorites())}
              >
                Clear all
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
