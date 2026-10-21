import { useTranslation } from 'react-i18next';
import { useMemo, useState } from 'react';
import emailjs from 'emailjs-com';
import { AnimatePresence, motion } from 'framer-motion';
import styles from "./Contact.module.css";
import { playSuccess, playError } from "../../lib/sfx";

const CONFETTI_COLORS = ["#35d0b0", "#ffcf56", "#ff6f6f", "#f4efe0"];

function LootConfetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        angle: (360 / 14) * i + (Math.random() * 20 - 10),
        distance: 40 + Math.random() * 40,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        delay: Math.random() * 0.08,
      })),
    []
  );

  return (
    <div className={styles.confetti} aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className={styles.confettiPiece}
          style={{
            "--angle": `${p.angle}deg`,
            "--distance": `${p.distance}px`,
            "--piece-color": p.color,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Contact() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState('success');
  const [popupMsg, setPopupMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Função robusta para garantir tradução ou fallback
    function getMsg(key, fallback) {
      const msg = t(key);
      if (!msg || msg === key || msg.startsWith('contact_form_')) return fallback;
      return msg;
    }

    const successMsg = getMsg('contact_form_success', 'Item adquirido: mensagem enviada!');
    const errorMsg = getMsg('contact_form_error', 'A investida falhou. Tente de novo.');

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      e.target,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    )
      .then(() => {
        setLoading(false);
        setPopupType('success');
        setPopupMsg(successMsg);
        setShowPopup(true);
        playSuccess();
        e.target.reset();
        setTimeout(() => setShowPopup(false), 4000);
      })
      .catch(() => {
        setLoading(false);
        setPopupType('error');
        setPopupMsg(errorMsg);
        setShowPopup(true);
        playError();
        setTimeout(() => setShowPopup(false), 4000);
      });
  };

  return (
    <section id="contact" className={styles.contactSection}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('contact_title')}</h2>
        <p className={styles.subtitle}>{t('contact_subtitle')}</p>
      </div>

      <div className={styles.contactContent}>
        <div className={`${styles.contactInfo} pixel-panel`}>
          <h3>{t('contact_info_title')}</h3>
          <p>{t('contact_info_subtitle')}</p>

          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>📧</div>
              <div>
                <h4>{t('contact_email')}</h4>
                <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}>{import.meta.env.VITE_CONTACT_EMAIL}</a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>💼</div>
              <div>
                <h4>LinkedIn</h4>
                <a href="https://www.linkedin.com/in/lrodrigues21/" target="_blank" rel="noopener noreferrer">linkedin.com/in/lrodrigues21</a>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}>🐙</div>
              <div>
                <h4>GitHub</h4>
                <a href="https://github.com/Mr-Lucasz" target="_blank" rel="noopener noreferrer">github.com/Mr-Lucasz</a>
              </div>
            </div>
          </div>
        </div>

        <form className={`${styles.contactForm} pixel-panel`} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">{t('contact_form_name')}</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">{t('contact_form_email')}</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="subject">{t('contact_form_subject')}</label>
            <input type="text" id="subject" name="subject" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="message">{t('contact_form_message')}</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>

          <AnimatePresence>
            {showPopup && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2 }}
                className={`${styles.popup} ${popupType === 'success' ? styles.popupSuccess : styles.popupError} pixel-panel`}
              >
                {popupType === 'success' && <LootConfetti />}
                <span>{popupType === 'success' ? '✔' : '✖'}</span>
                <span>{popupMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className={`${styles.submitButton} pixel-btn`}
            disabled={loading}
          >
            {loading ? (t('contact_form_sending') || 'Enviando...') : t('contact_form_send')}
          </button>
        </form>
      </div>
    </section>
  );
}
