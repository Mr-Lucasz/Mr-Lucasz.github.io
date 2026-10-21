import { useEffect, useRef } from "react";

const CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(onUnlock) {
  const progress = useRef(0);

  useEffect(() => {
    function handleKeyDown(e) {
      const expected = CODE[progress.current];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === expected) {
        progress.current += 1;
        if (progress.current === CODE.length) {
          progress.current = 0;
          onUnlock();
        }
      } else {
        progress.current = key === CODE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onUnlock]);
}
