import ProductCard from "./ProductCard";
export default function ProductGrid({ items }) {
  return (
    <div className="grid">
      {items?.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
