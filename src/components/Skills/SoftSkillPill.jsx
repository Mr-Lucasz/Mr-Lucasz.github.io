import { motion } from "framer-motion";
import styles from "./SoftSkillPill.module.css";

export function SoftSkillPill({ skill, delay }) {
  return (
    <motion.div
      className={styles.softSkillPill}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -3 }}
    >
      {skill.name}
      <div className={styles.skillLevelIndicator}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={styles.levelDot}
            data-lit={i < Math.floor(skill.level / 20)}
          />
        ))}
      </div>
    </motion.div>
  );
}
