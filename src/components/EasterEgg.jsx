import { useCallback, useState } from "react";
import { useKonamiCode } from "../hooks/useKonamiCode";
import { playPowerUp } from "../lib/sfx";
import styles from "./EasterEgg.module.css";

export function EasterEgg() {
  const [active, setActive] = useState(false);

  const unlock = useCallback(() => {
    if (active) return;
    playPowerUp();
    setActive(true);
    setTimeout(() => setActive(false), 2600);
  }, [active]);

  useKonamiCode(unlock);

  if (!active) return null;

  return (
    <div className={styles.overlay} aria-live="polite">
      <p className={styles.banner}>★ GODMODE ATIVADO ★</p>
      <p className={styles.sub}>+9999 XP EM CAÇAR BUGS</p>
    </div>
  );
}
