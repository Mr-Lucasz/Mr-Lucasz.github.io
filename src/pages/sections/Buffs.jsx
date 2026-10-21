import { useTranslation } from "react-i18next";
import styles from "./Buffs.module.css";
import { usePixelReveal } from "../../hooks/usePixelReveal";
import { getBuffsData } from "../../data/buffsData";

export function Buffs() {
  const { t } = useTranslation();
  const [ref] = usePixelReveal();
  const list = getBuffsData(t);

  return (
    <section id="buffs" className={styles.buffsSection} ref={ref}>
      <div className={styles.header}>
        <p className={styles.eyebrow}>{t("buffs_eyebrow")}</p>
        <h2 className={styles.title}>{t("buffs_title")}</h2>
        <p className={styles.subtitle}>{t("buffs_subtitle")}</p>
      </div>

      <div className={styles.list}>
        {list.map((item, idx) => (
          <div className={`${styles.card} pixel-panel`} key={idx}>
            <div className={styles.photoFrame}>
              <img src={item.image} alt={item.event} className={styles.photo} />
              <span className={styles.photoBadge}>{item.icon}</span>
            </div>
            <div className={styles.body}>
              <div className={styles.cardHead}>
                <span className={styles.role}>{item.role}</span>
                {item.period && <span className={styles.period}>{item.period}</span>}
              </div>
              <h3 className={styles.event}>{item.event}</h3>
              <p className={styles.detail}>{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
