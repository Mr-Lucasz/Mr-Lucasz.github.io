import { motion } from "framer-motion";
import styles from "./SkillBar.module.css";

export function SkillBar({ skill, delay }) {
  return (
    <motion.div
      className={styles.skillBarContainer}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <div className={styles.skillInfo}>
        <span className={styles.skillIcon}>{skill.icon}</span>
        <span className={styles.skillName}>{skill.name}</span>
        <span className={styles.skillPercent}>{skill.level}%</span>
      </div>
      <div className={styles.skillBarBackground}>
        <motion.div
          className={styles.skillBarFill}
          initial={{ width: "0%" }}
          animate={{ width: [`0%`, `${Math.min(skill.level + 8, 100)}%`, `${skill.level}%`] }}
          transition={{ duration: 0.9, delay: delay + 0.2, times: [0, 0.75, 1], ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
