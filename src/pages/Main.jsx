import { useEffect, useRef, useState } from "react";
import { Header } from "../components/TopNavigation/Header";
import { LoadingScreen } from "../components/LoadingScreen";
import { AboutMe } from "./sections/AboutMe";
import { Experiences } from "./sections/Experiences";
import { Education } from "./sections/Education";
import { Buffs } from "./sections/Buffs";
import { Skills } from "./sections/Skills";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import { EasterEgg } from "../components/EasterEgg";
import styles from "./Main.module.css";
import AnimatedCursor from "react-animated-cursor";
import { useTranslation } from 'react-i18next';

export function Main() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  // Verifica se já foi exibido o vídeo de introdução
  const [showContent, setShowContent] = useState(() => {
    return localStorage.getItem('introSeen') === 'true';
  });
  const [pageReady, setPageReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setPageReady(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const handleStartClick = () => {
    setIsLoading(true);
  };

  const handleVideoEnd = () => {
    setIsLoading(false);
    setShowContent(true);
    localStorage.setItem('introSeen', 'true');
  };

  if (isLoading && !showContent) {
    return (
      <LoadingScreen
        onVideoEnd={handleVideoEnd}
        videoRef={videoRef}
      />
    );
  }

  if (showContent) {
    return (
      <div className={styles.page} style={{ opacity: pageReady ? 1 : 0, transition: "opacity 0.6s ease" }}>
        <AnimatedCursor color="255, 207, 86" />
        <div className={styles.crtOverlay} aria-hidden="true" />
        <EasterEgg />
        <Header />
        <main className={styles.mainContent}>
          <AboutMe />
          <Experiences />
          <Education />
          <Buffs />
          <Skills />
          <Projects />
          <Contact />
        </main>
      </div>
    );
  }

  // Tela de título — "insira a moeda" antes do jogo começar
  return (
    <div className={styles.playContainer}>
      <AnimatedCursor color="255, 207, 86" />
      <div className={styles.titleCard}>
        <p className={styles.titleGame}>LUCAS RODRIGUES</p>
        <p className={styles.titleSubtitle}>{t('play_subtitle')}</p>
        <button
          className={styles.playButton}
          onClick={() => {
            handleStartClick();
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play();
              }
            }, 100);
          }}
        >
          {t('play_button')}
        </button>
        <p className={styles.titleHint}>{t('play_hint')}</p>
      </div>
    </div>
  );
}
