import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MuteToggle } from "./MuteToggle";
import { useActiveSection } from "../../hooks/useActiveSection";
import styles from './Navbar.module.css';

const SECTIONS = ["about", "experiences", "education", "buffs", "skills", "projects", "contact"];

export function Navbar({ menuOpen, setMenuOpen }) {
  const { t } = useTranslation();
  const headerOffset = -96;
  const activeSection = useActiveSection(SECTIONS);

  const scrollConfig = {
    smooth: true,
    duration: 700,
    offset: headerOffset,
    delay: 0,
    isDynamic: true,
  };

  // Fecha o menu mobile ao clicar em um link
  const handleLinkClick = () => {
    if (setMenuOpen) setMenuOpen(false);
  };

  const renderLinks = (onClick) =>
    SECTIONS.map((id) => (
      <li key={id}>
        <Link
          to={id}
          {...scrollConfig}
          className={id === activeSection ? styles.activeLink : undefined}
          aria-current={id === activeSection ? "location" : undefined}
          onClick={onClick}
        >
          {t(id)}
        </Link>
      </li>
    ));

  return (
    <nav className={styles.navbar}>
      {/* Menu padrão desktop */}
      <ul className={styles.navbarList + ' ' + styles.desktopMenu}>
        {renderLinks()}
      </ul>
      <div className={styles.desktopLang}><LanguageSwitcher /><MuteToggle /></div>
      {/* Menu mobile */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            {renderLinks(handleLinkClick)}
          </ul>
          <div className={styles.mobileLang}><LanguageSwitcher /><MuteToggle /></div>
        </div>
      )}
    </nav>
  );
}
