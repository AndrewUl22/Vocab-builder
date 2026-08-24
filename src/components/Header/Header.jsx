import { useEffect, useState } from 'react';
import Logo from '../Logo/Logo';
import UserNav from '../UserNav/UserNav';
import UserBar from '../UserBar/UserBar';
import { BurgerIcon, CloseIcon } from '../icons/MenuIcons';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Logo />

        <UserNav className={styles.desktopNav} />
        <UserBar className={styles.desktopUserBar} />

        <button
          type="button"
          className={styles.burgerBtn}
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
        >
          <BurgerIcon />
        </button>
      </div>

      {isMenuOpen && (
        <div className={styles.backdrop} onClick={closeMenu}>
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.drawerTop}>
              <Logo to="/dictionary" />
              <button type="button" className={styles.closeBtn} onClick={closeMenu} aria-label="Close menu">
                <CloseIcon />
              </button>
            </div>

            <UserNav onNavigate={closeMenu} />
            <UserBar onLogout={closeMenu} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
