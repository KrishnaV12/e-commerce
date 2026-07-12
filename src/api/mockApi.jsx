import products from "../data/product.json";
export const CATEGORIES = [...new Set(products.map((p) => p.category))].sort();
const DELAY = 500;

export function fetchProductsPage({
  page = 0,
  pageSize = 8,
  category = "All",
  minRating = 0,
  sort = "none",
}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let list = products.filter((p) => {
        if (category !== "All" && p.category !== category) return false;
        if (p.rating < minRating) return false;
        return true;
      });

      if (sort === "price-asc")
        list = [...list].sort((a, b) => a.price - b.price);
      else if (sort === "price-desc")
        list = [...list].sort((a, b) => b.price - a.price);

      const start = page * pageSize;
      const items = list.slice(start, start + pageSize);
      const nextPage = start + pageSize < list.length ? page + 1 : undefined;
      resolve({ items, nextPage, total: list.length });
    }, DELAY);
  });
}

const byId = new Map(products.map((p) => [p.id, p]));
export const getProductsByIds = (ids) =>
  ids.map((id) => byId.get(id)).filter(Boolean);
