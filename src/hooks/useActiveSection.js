import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently being read. A section becomes
 * active once its top crosses a "reading line" a bit below the fixed header,
 * so the nav highlights what the user is looking at — not the section that
 * merely still peeks under the header (react-scroll's spy lagged one behind).
 */
export function useActiveSection(ids, readingLine = 0.5) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    function update() {
      const line = window.innerHeight * readingLine;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(atBottom ? ids[ids.length - 1] : current);
    }

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, readingLine]);

  return active;
}
