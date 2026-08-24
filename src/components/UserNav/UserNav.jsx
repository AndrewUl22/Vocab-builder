import { NavLink } from 'react-router-dom';
import styles from './UserNav.module.css';

const NAV_ITEMS = [
  { to: '/dictionary', label: 'Dictionary' },
  { to: '/recommend', label: 'Recommend' },
  { to: '/training', label: 'Training' },
];

const UserNav = ({ onNavigate, className = '' }) => {
  return (
    <nav className={`${styles.nav} ${className}`} aria-label="Main navigation">
      <ul className={styles.list}>
        {NAV_ITEMS.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={onNavigate}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default UserNav;
