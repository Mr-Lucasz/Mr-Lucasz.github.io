import { useTranslation } from "react-i18next";
import styles from "./Education.module.css";
import { usePixelReveal } from "../../hooks/usePixelReveal";

export function Education() {
  const { t } = useTranslation();
  const [ref] = usePixelReveal();
  const list = t("education_list", { returnObjects: true });

  return (
    <section id="education" className={styles.educationSection} ref={ref}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t("education_eyebrow")}</p>
        <h2 className={styles.title}>{t("education_title")}</h2>
        <p className={styles.subtitle}>{t("education_subtitle")}</p>
      </div>

      <div className={styles.list}>
        {list.map((item, idx) => (
          <div className={`${styles.card} pixel-panel`} key={idx}>
            <div className={styles.cardHead}>
              <h3>{item.institution}</h3>
              {item.status === "ongoing" && <span className={`${styles.badge} ${styles.badgeOngoing}`}>{t("education_status_ongoing")}</span>}
              {item.status === "completed" && <span className={`${styles.badge} ${styles.badgeCompleted}`}>{t("education_status_completed")}</span>}
            </div>
            <p className={styles.degree}>{item.degree}</p>
            <p className={styles.period}>{item.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
