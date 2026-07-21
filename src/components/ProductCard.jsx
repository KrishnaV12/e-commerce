import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favouriteSlice";
import LazyImage from "./LazyImage";
import { calculateSalePrice } from "./prizeCalculator";

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((s) => s.favorites.ids.includes(product.id));

  const finalPrice = calculateSalePrice(product);
  return (
    <article className={`card ${isFavorite ? "is-favorite" : ""}`}>
      <div className="card__media">
        <LazyImage src={product.image} alt={product.name} />
        <span className="card__category">{product.category}</span>
        <button
          type="button"
          className="card__fav"
          aria-pressed={isFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(toggleFavorite(product.id));
          }}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="card__body">
        <h3 className="card__name">{product.name}</h3>
        <div className="card__meta">
          <span className="card__price">
            <span
              className={
                product.sale ? "original-price_sale" : "original-price"
              }
            >
              ${product.price}
            </span>
          </span>
          <span className="card__rating" title={`${product.rating} out of 5`}>
            ★ {product.rating.toFixed(1)}
          </span>
        </div>
        {product.sale && (
          <span className="original-price">Final Prize ${finalPrice}</span>
        )}
      </div>
    </article>
  );
}

export default memo(ProductCard);
