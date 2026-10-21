import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { PixelLogo } from "./PixelLogo";
import { Navbar } from "./Navbar";

function HamburgerButton({ menuOpen, setMenuOpen }) {
  return (
    <button
      className={styles.hamburger + (menuOpen ? ' ' + styles.hamburgerOpen : '')}
      aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen((open) => !open)}
    >
      <span className={styles.hamburgerBar}></span>
      <span className={styles.hamburgerBar}></span>
      <span className={styles.hamburgerBar}></span>
      {/* Ícone de close (X) sobreposto */}
      <span className={styles.closeIcon}>&#10005;</span>
    </button>
  );
}

export function Header() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [transparency, setTransparency] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      let scrollPosition = window.pageYOffset;
      if (scrollPosition > 500) {
        setTransparency(1);
      } else {
        setTransparency(scrollPosition / 500);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoStyle = {
    transform: `translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px) rotate(${mousePosition.x * 0.002}deg)`,
  };

  const headerStyle = {
    background: `rgba(13, 13, 31, ${0.85 + transparency * 0.15})`,
    borderBottom: `3px solid rgba(13, 13, 31, ${0.6 + transparency * 0.4})`,
  };

  return (
    <header style={headerStyle} className={styles.header}>
      <div className={styles.logoContainer}>
        <PixelLogo className={styles.logotipo} style={logoStyle} />
      </div>
      <div className={styles.spacer} />
      <HamburgerButton menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
}
