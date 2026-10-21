import { useSfxMuted } from "../../hooks/useSfxMuted";
import { playClick } from "../../lib/sfx";
import styles from "./MuteToggle.module.css";

export function MuteToggle() {
  const [muted, setMuted] = useSfxMuted();

  function handleClick() {
    const next = !muted;
    setMuted(next);
    if (!next) playClick();
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={handleClick}
      aria-label={muted ? "Ativar som" : "Desativar som"}
      aria-pressed={!muted}
      title={muted ? "Som: desligado" : "Som: ligado"}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
