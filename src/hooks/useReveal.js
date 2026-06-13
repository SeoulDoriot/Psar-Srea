import { useEffect, useRef, useState } from "react";

/**
 * useReveal — lightweight scroll reveal using IntersectionObserver.
 * Returns a ref to attach to an element and a boolean once it enters view.
 * No external animation library required.
 */
export function useReveal({ threshold = 0.18, rootMargin = "0px 0px -8% 0px", once = true } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Respect reduced-motion / no-IO: just show immediately.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, visible];
}

/**
 * Reveal — convenience wrapper that adds an `is-revealed` class when in view.
 * `as` lets you pick the element, `delay` staggers the animation (ms).
 */
import { createElement } from "react";

export function Reveal({
  as = "div",
  className = "",
  delay = 0,
  children,
  threshold,
  once,
  style,
  ...rest
}) {
  const [ref, visible] = useReveal({ threshold, once });
  return createElement(
    as,
    {
      ref,
      className: `reveal ${visible ? "is-revealed" : ""} ${className}`.trim(),
      style: { ...style, transitionDelay: delay ? `${delay}ms` : undefined },
      ...rest,
    },
    children,
  );
}
