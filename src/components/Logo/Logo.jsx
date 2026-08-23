import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

const Logo = ({ to = '/dictionary' }) => {
  return (
    <Link to={to} className={styles.logo} aria-label="VocabBuilder">
      <span className={styles.mark} aria-hidden="true">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8.42" fill="#85AA9F" />
          <rect x="7" y="14" width="9" height="12" rx="3" fill="#FCFCFC" transform="rotate(-90 7 14)" />
          <rect x="22" y="14" width="9" height="12" rx="3" fill="#FCFCFC" transform="rotate(-90 22 14)" />
          <rect x="16" y="6" width="9" height="12" rx="3" fill="#FCFCFC" />
          <rect x="16" y="21" width="9" height="12" rx="3" fill="#FCFCFC" />
        </svg>
      </span>
      <span className={styles.text}>VocabBuilder</span>
    </Link>
  );
};

export default Logo;
