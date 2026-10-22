import { useRef, useState } from "react";
import { Link } from "react-scroll";
import { TypeAnimation } from "react-type-animation";
import { useTranslation } from "react-i18next";
import styles from "./AboutMe.module.css";
import { usePixelReveal } from "../../hooks/usePixelReveal";
import { skillsData } from "../../data/skillsData";
import { playHover, playClick, playHit } from "../../lib/sfx";

const HERO_STATS = [
  { key: "automation", labelKey: "about_stat_automation", value: skillsData.qaTechnical[0].level },
  { key: "rootcause", labelKey: "about_stat_rootcause", value: skillsData.qaProcess.find((s) => s.name.startsWith("Root Cause"))?.level ?? 90 },
  { key: "leadership", labelKey: "about_stat_leadership", value: skillsData.leadership.find((s) => s.name === "AI Champion")?.level ?? skillsData.leadership[0].level },
];

const BATTLE_MENU = [
  { to: "projects", actionKey: "about_menu_fight", labelKey: "projects" },
  { to: "skills", actionKey: "about_menu_items", labelKey: "skills" },
  { to: "experiences", actionKey: "about_menu_status", labelKey: "experiences" },
  { to: "contact", actionKey: "about_menu_flee", labelKey: "contact" },
];

const HITS = ["CRIT!", "-99", "MISS?!", "-1", "OW!", "-42"];

function BugSprite({ onHit, hitClass, hitLabel }) {
  return (
    <div className={styles.bugWrap}>
      <svg
        className={`${styles.bugSprite} ${hitClass ? styles.bugHit : ""}`}
        width="86"
        height="70"
        viewBox="0 0 43 35"
        shapeRendering="crispEdges"
        role="img"
        aria-hidden="true"
        onClick={onHit}
      >
        <rect x="16" y="6" width="11" height="4" fill="#ff6f6f" />
        <rect x="12" y="10" width="19" height="14" fill="#ff8b8b" />
        <rect x="8" y="14" width="4" height="8" fill="#ff6f6f" />
        <rect x="31" y="14" width="4" height="8" fill="#ff6f6f" />
        <rect x="14" y="24" width="4" height="7" fill="#2a1414" />
        <rect x="25" y="24" width="4" height="7" fill="#2a1414" />
        <rect x="16" y="13" width="4" height="4" fill="#181934" />
        <rect x="23" y="13" width="4" height="4" fill="#181934" />
        <rect x="2" y="8" width="8" height="2" fill="#ff6f6f" />
        <rect x="33" y="8" width="8" height="2" fill="#ff6f6f" />
      </svg>
      {hitLabel && <span className={styles.hitLabel} key={hitLabel.id}>{hitLabel.text}</span>}
    </div>
  );
}

export function AboutMe() {
  const { t } = useTranslation();
  const [ref] = usePixelReveal();
  const [hitClass, setHitClass] = useState(false);
  const [hitLabel, setHitLabel] = useState(null);
  const hitTimeout = useRef(null);

  function handleHit() {
    playHit();
    setHitClass(true);
    setHitLabel({ id: Date.now(), text: HITS[Math.floor(Math.random() * HITS.length)] });
    clearTimeout(hitTimeout.current);
    hitTimeout.current = setTimeout(() => setHitClass(false), 260);
  }

  return (
    <section id="about" className={styles.sectionAbout} ref={ref}>
      <p className={styles.banner}>{t("about_banner")}</p>

      <div className={styles.stage}>
        <BugSprite onHit={handleHit} hitClass={hitClass} hitLabel={hitLabel} />
      </div>

      <div className={`${styles.statsPanel} pixel-panel`}>
        {HERO_STATS.map((stat) => (
          <div className={styles.statRow} key={stat.key}>
            <span className={styles.statLabel}>{t(stat.labelKey)}</span>
            <div className={styles.statBar}>
              <div className={styles.statBarFill} style={{ width: `${stat.value}%` }} />
            </div>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      <div className={`${styles.dialogue} pixel-panel`}>
        <h1 className={styles.dialogueName}>LUCAS RODRIGUES</h1>
        <TypeAnimation
          className={styles.dialogueRole}
          sequence={[
            t("about_role1"),
            1500,
            t("about_role2"),
            1500,
            t("about_role3"),
            1500,
          ]}
          wrapper="p"
          speed={50}
          repeat={Infinity}
        />
        <p className={styles.dialogueText}>{t("about_description")}</p>
      </div>

      <nav className={styles.battleMenu} aria-label={t("about_menu_aria")}>
        {BATTLE_MENU.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={styles.menuItem}
            smooth
            duration={700}
            offset={-96}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <span className={styles.menuAction}>{t(item.actionKey)}</span>
            <span className={styles.menuLabel}>{t(item.labelKey)}</span>
          </Link>
        ))}
        {/* "ponto de save" do recrutador: CV em PDF */}
        <a
          href={`${import.meta.env.BASE_URL}${t("cv_file")}`}
          download
          className={`${styles.menuItem} ${styles.menuItemWide}`}
          aria-label={t("cv_download_aria")}
          onMouseEnter={playHover}
          onClick={playClick}
        >
          <span className={styles.menuAction}>{t("about_menu_save")}</span>
          <span className={styles.menuLabel}>{t("cv_label")}</span>
        </a>
      </nav>
    </section>
  );
}
