import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/slice';
import { logOut } from '../../redux/auth/operations';
import { fetchStatistics } from '../../redux/words/operations';
import { selectStatistics, selectIsStatisticsLoading } from '../../redux/words/slice';
import { UserIcon } from '../../components/icons/MenuIcons';
import Button from '../../components/Button/Button';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const statistics = useSelector(selectStatistics);
  const isStatsLoading = useSelector(selectIsStatisticsLoading);
  const initial = user?.name?.trim()?.[0]?.toUpperCase() || <UserIcon />;

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.avatar} aria-hidden="true">
          {initial}
        </span>
        <h1 className={styles.name}>{user?.name || 'User'}</h1>
        <p className={styles.email}>{user?.email}</p>

        <div className={styles.statsRow}>
          <span className={styles.statsLabel}>Words to learn</span>
          <span className={styles.statsValue}>
            {isStatsLoading ? '…' : statistics?.totalCount ?? '—'}
          </span>
        </div>

        <Button type="button" variant="outline" onClick={() => dispatch(logOut())}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
