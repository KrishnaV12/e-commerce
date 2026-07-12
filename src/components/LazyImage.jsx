import { useEffect, useRef, useState } from "react";

export default function LazyImage({ src, alt }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="lazy-image" ref={ref}>
      {!loaded && <div className="lazy-image__skeleton" />}
      {visible && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`lazy-image__img ${loaded ? "is-loaded" : ""}`}
        />
      )}
    </div>
  );
}
