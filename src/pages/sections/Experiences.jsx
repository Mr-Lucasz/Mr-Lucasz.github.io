import { ExperienceTimeline } from "../../components/ExperienceTimeline";
import styles from "./Experiences.module.css";
import { useTranslation } from 'react-i18next';
import { usePixelReveal } from "../../hooks/usePixelReveal";

export function Experiences() {
  const { t } = useTranslation();
  const [ref] = usePixelReveal();

  return (
    <section id="experiences" className={styles.sectionExperiences} ref={ref}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t('experiences_title_highlight')}</p>
        <h2 className={styles.title}>{t('experiences_title')}</h2>
        <p className={styles.subtitle}>{t('experiences_subtitle')}</p>
      </div>
      <ExperienceTimeline />
    </section>
  );
}
