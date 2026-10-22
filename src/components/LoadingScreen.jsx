import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import welcome from "../assets/welcome.webm";
import styles from "./LoadingScreen.module.css";

// Intro curta: o vídeo acelera e é cortado após MAX_INTRO_MS; clique ou tecla pula.
const MAX_INTRO_MS = 2500;
const PLAYBACK_RATE = 1.5;

export function LoadingScreen({ onVideoEnd, videoRef }) {
  const { t } = useTranslation();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = PLAYBACK_RATE;
    const timer = window.setTimeout(onVideoEnd, MAX_INTRO_MS);
    window.addEventListener("keydown", onVideoEnd);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onVideoEnd);
    };
  }, [onVideoEnd, videoRef]);

  return (
    <div className={styles.loadingContainer} onClick={onVideoEnd}>
      <video
        ref={videoRef}
        className={styles.video}
        onEnded={onVideoEnd}
        playsInline
      >
        <source src={welcome} type="video/webm" />
      </video>
      <button type="button" className={styles.skipButton} onClick={onVideoEnd}>
        {t("intro_skip")}
      </button>
    </div>
  );
}
