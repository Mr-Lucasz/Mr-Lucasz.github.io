import { useTranslation } from "react-i18next";
import styles from "./Projects.module.css";
import { getProjectsData } from "../../data/projectsData";
import { usePixelReveal } from "../../hooks/usePixelReveal";

function ProjectCard({ project, t }) {
  return (
    <div className={`${styles.projectCard} ${styles[`rarity-${project.rarity}`]}`}>
      <span className={`${styles.badge} ${styles[`badge-${project.badge}`]}`}>
        {project.badgeLabel}
      </span>
      <div className={styles.projectContent}>
        <h3>{project.title}</h3>
        <p className={styles.tagline}>{project.tagline}</p>
        <p className={styles.role}>{project.role}</p>
        <div className={styles.projectTags}>
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.codeLink}
          >
            {t("projects_view_code")}
          </a>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const { t } = useTranslation();
  const [ref] = usePixelReveal();
  const projects = getProjectsData(t);

  return (
    <section id="projects" className={styles.projectsSection} ref={ref}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t("projects_title")}</h2>
        <p className={styles.subtitle}>{t("projects_subtitle")}</p>
      </div>

      <div className={styles.projectsGrid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} t={t} />
        ))}
      </div>
    </section>
  );
}
