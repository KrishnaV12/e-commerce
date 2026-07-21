import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useInfiniteProducts } from "./hooks/useInfiniteProduct";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import FavoritesDrawer from "./components/FavouriteDrawer";

export default function App() {
  const theme = useSelector((s) => s.ui.theme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {showSaleOnly} = useSelector((state)=> state.filters)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const {
    items,
    total,
    status,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteProducts();

  useInfiniteScroll({
    onLoadMore: fetchNextPage,
    canLoadMore: hasNextPage && !isFetchingNextPage,
  });

  const saleFilterItems = items?.filter(item => !showSaleOnly || item.sale === true)

  return (
    <div className="app">
      <Header onOpenFavorites={() => setDrawerOpen(true)} />

      <main className="content">
        {status === "pending" && (
          <div className="state">
            <div className="spinner" aria-hidden="true" />
            <p>Loading products…</p>
          </div>
        )}

        {isError && (
          <div className="state">
            <p>Couldn’t load products.</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="results-bar">
              {total} product{total === 1 ? "" : "s"}
            </div>

            {items.length === 0 && !isFetching ? (
              <div className="state">
                <p>No products match your filters.</p>
                <p className="muted">Try a different category or rating.</p>
              </div>
            ) : (
              <ProductGrid items={saleFilterItems} />
            )}

            <div className="sentinel">
              {isFetchingNextPage && (
                <div className="spinner" aria-hidden="true" />
              )}
              {!hasNextPage && items.length > 0 && (
                <span className="muted">
                  You’ve reached the end · {total} items
                </span>
              )}
            </div>
          </>
        )}
      </main>

      <FavoritesDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
}
