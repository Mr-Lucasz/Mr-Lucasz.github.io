import "chart.js/auto";
import styles from "./Skills.module.css";
import { skillsData } from "../../data/skillsData";
import { SkillsTestAutomationSection } from "../../components/Skills/SkillsTestAutomationSection";
import { SkillsTechnicalSection } from "../../components/Skills/SkillsTechnicalSection";
import { SkillsQAProcessSection } from "../../components/Skills/SkillsQAProcessSection";
import { SkillsLeadershipSection } from "../../components/Skills/SkillsLeadershipSection";
import { SkillsCertificationsSection } from "../../components/Skills/SkillsCertificationsSection";
import { useTranslation } from "react-i18next";
import { usePixelReveal } from "../../hooks/usePixelReveal";

export function Skills() {
  const { t } = useTranslation();
  const [ref, inView] = usePixelReveal();

  const radarData = {
    labels: skillsData.programming.map((skill) => skill.name),
    datasets: [
      {
        label: "Technical Stack",
        data: skillsData.programming.map((skill) => skill.level),
        backgroundColor: "rgba(255, 111, 111, 0.18)",
        borderColor: "#35d0b0",
        borderWidth: 2,
        pointBackgroundColor: "#ffcf56",
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          color: "rgba(157, 155, 196, 0.3)",
        },
        suggestedMin: 0,
        suggestedMax: 100,
        pointLabels: {
          color: "#f4efe0",
          font: {
            family: "VT323",
            size: 16,
          },
        },
        grid: {
          color: "rgba(157, 155, 196, 0.25)",
        },
        ticks: {
          color: "#9d9bc4",
          backdropColor: "transparent",
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <section id="skills" className={styles.skillsSection} ref={ref}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("skills_title")}</h2>
        <p className={styles.subtitle}>{t("skills_subtitle")}</p>
      </div>
      <div className={styles.dashboard}>
        <SkillsTestAutomationSection
          skillsData={skillsData}
          inView={inView}
          t={t}
        />
        <SkillsTechnicalSection
          radarData={radarData}
          radarOptions={radarOptions}
          inView={inView}
          t={t}
        />
        <SkillsQAProcessSection
          skillsData={skillsData}
          inView={inView}
          t={t}
        />
        <SkillsLeadershipSection
          skillsData={skillsData}
          inView={inView}
          t={t}
        />
        <SkillsCertificationsSection
          skillsData={skillsData}
          inView={inView}
          t={t}
        />
      </div>
    </section>
  );
}
