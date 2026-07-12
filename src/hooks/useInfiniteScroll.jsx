import { useEffect } from "react";
import throttle from "lodash/throttle";

export function useInfiniteScroll({ onLoadMore, canLoadMore }) {
  useEffect(() => {
    if (!canLoadMore) return;

    const check = throttle(() => {
      const scrolled = window.innerHeight + window.scrollY;
      const nearBottom =
        scrolled >= document.documentElement.scrollHeight - 400;
      if (nearBottom) onLoadMore();
    }, 300);

    window.addEventListener("scroll", check);
    check();

    return () => {
      check.cancel();
      window.removeEventListener("scroll", check);
    };
  }, [onLoadMore, canLoadMore]);
}
