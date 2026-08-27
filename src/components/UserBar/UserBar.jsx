import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/slice';
import { logOut } from '../../redux/auth/operations';
import { UserIcon, ArrowRightIcon } from '../icons/MenuIcons';
import styles from './UserBar.module.css';

const UserBar = ({ onLogout, onNavigate, className = '' }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const initial = user?.name?.trim()?.[0]?.toUpperCase() || <UserIcon />;

  const handleLogout = () => {
    dispatch(logOut());
    onLogout?.();
  };

  return (
    <div className={`${styles.bar} ${className}`}>
      <Link to="/profile" className={styles.profileLink} onClick={onNavigate}>
        <span className={styles.avatar} aria-hidden="true">
          {initial}
        </span>
        <span className={styles.info}>
          <span className={styles.name}>{user?.name || 'User'}</span>
          <span className={styles.email}>{user?.email}</span>
        </span>
      </Link>
      <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
        Log out
        <ArrowRightIcon />
      </button>
    </div>
  );
};

export default UserBar;
