import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MuteToggle } from "./MuteToggle";
import styles from './Navbar.module.css';

export function Navbar({ menuOpen, setMenuOpen }) {
  const { t } = useTranslation();
  const headerOffset = -96;

  const scrollConfig = {
    spy: true,
    hashSpy: true,
    smooth: true,
    duration: 700,
    offset: headerOffset,
    delay: 0,
    isDynamic: true,
    activeClass: styles.activeLink,
  };

  // Fecha o menu mobile ao clicar em um link
  const handleLinkClick = () => {
    if (setMenuOpen) setMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Menu padrão desktop */}
      <ul className={styles.navbarList + ' ' + styles.desktopMenu}>
        <li><Link to="about" {...scrollConfig}>{t('about')}</Link></li>
        <li><Link to="experiences" {...scrollConfig}>{t('experiences')}</Link></li>
        <li><Link to="education" {...scrollConfig}>{t('education')}</Link></li>
        <li><Link to="buffs" {...scrollConfig}>{t('buffs')}</Link></li>
        <li><Link to="skills" {...scrollConfig}>{t('skills')}</Link></li>
        <li><Link to="projects" {...scrollConfig}>{t('projects')}</Link></li>
        <li><Link to="contact" {...scrollConfig}>{t('contact')}</Link></li>
      </ul>
      <div className={styles.desktopLang}><LanguageSwitcher /><MuteToggle /></div>
      {/* Menu mobile */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileMenuList}>
            <li><Link to="about" {...scrollConfig} onClick={handleLinkClick}>{t('about')}</Link></li>
            <li><Link to="experiences" {...scrollConfig} onClick={handleLinkClick}>{t('experiences')}</Link></li>
            <li><Link to="education" {...scrollConfig} onClick={handleLinkClick}>{t('education')}</Link></li>
            <li><Link to="buffs" {...scrollConfig} onClick={handleLinkClick}>{t('buffs')}</Link></li>
            <li><Link to="skills" {...scrollConfig} onClick={handleLinkClick}>{t('skills')}</Link></li>
            <li><Link to="projects" {...scrollConfig} onClick={handleLinkClick}>{t('projects')}</Link></li>
            <li><Link to="contact" {...scrollConfig} onClick={handleLinkClick}>{t('contact')}</Link></li>
          </ul>
          <div className={styles.mobileLang}><LanguageSwitcher /><MuteToggle /></div>
        </div>
      )}
    </nav>
  );
}