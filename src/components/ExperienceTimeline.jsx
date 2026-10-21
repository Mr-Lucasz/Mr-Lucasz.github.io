/* ExperienceTimeline.js */
import { useTranslation } from "react-i18next";
import { getExperienceData } from "../data/experienceData";
import { ExperienceItem } from "./ExperienceItem";
import styles from "./ExperienceTimeline.module.css";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function ExperienceTimeline() {
  const { t } = useTranslation();
  const experienceData = getExperienceData(t);
  const [openIdx, setOpenIdx] = useState(null);
  // Começa assumindo desktop (mostra tudo) em vez de confiar em window.innerWidth
  // no primeiro render — em alguns contextos (iframe/preview ainda sem layout
  // definitivo) essa leitura vem 0 e a seção inteira ficava presa recolhida,
  // escondendo os logos das empresas para sempre. Uma medição real após o
  // mount corrige isso sem esconder conteúdo por padrão.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function checkMobile() {
      const mobile = window.innerWidth > 0 && window.innerWidth <= 768;
      setIsMobile((prev) => {
        if (prev !== mobile) setOpenIdx(null); // Fecha todos ao trocar modo
        return mobile;
      });
    }
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className={styles.timelineContainer}>
      <div className={styles.timeline}>
        {experienceData.map((item, idx) => (
          <motion.div
            key={idx}
            className={styles.timelineItem}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className={styles.timelineDotModern}>
              <svg width="18" height="18" viewBox="0 0 18 18" shapeRendering="crispEdges">
                <rect x="0" y="0" width="18" height="18" fill="#0d0d1f" />
                <rect x="3" y="3" width="12" height="12" fill={idx % 2 === 0 ? '#ff6f6f' : '#35d0b0'} />
              </svg>
            </div>
            {isMobile ? (
              <div className={styles.collapseRow}>
                <button
                  className={styles.collapseButtonModern}
                  onClick={() => handleToggle(idx)}
                  aria-expanded={openIdx === idx}
                  aria-controls={`exp-item-${idx}`}
                >
                  <span className={styles.collapseTitle}><span className={styles.cargo}>{item.role}</span> <span className={styles.company}>{item.company}</span></span>
                  <span className={styles.collapseArrowModern} aria-hidden="true">▼</span>
                </button>
              </div>
            ) : null}
            <motion.div layout transition={{ duration: 0.4 }}>
              {(!isMobile || openIdx === idx) && (
                <div id={`exp-item-${idx}`}>
                  <ExperienceItem item={item} idx={idx} />
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}