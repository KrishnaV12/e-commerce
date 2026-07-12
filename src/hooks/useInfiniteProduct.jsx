import { useInfiniteQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { fetchProductsPage } from "../api/mockApi";

const PAGE_SIZE = 100;

export function useInfiniteProducts() {
  const filters = useSelector((s) => s.filters);

  const query = useInfiniteQuery({
    queryKey: ["products", filters],
    queryFn: ({ pageParam }) =>
      fetchProductsPage({ page: pageParam, pageSize: PAGE_SIZE, ...filters }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000,
  });

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;
  return { ...query, items, total };
}
