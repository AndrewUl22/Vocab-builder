import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/auth/slice';
import { logOut } from '../../redux/auth/operations';
import { fetchStatistics } from '../../redux/words/operations';
import { selectStatistics, selectIsStatisticsLoading } from '../../redux/words/slice';
import { instance } from '../../services/api';
import { UserIcon, ArrowRightIcon } from '../../components/icons/MenuIcons';
import Button from '../../components/Button/Button';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const statistics = useSelector(selectStatistics);
  const isStatsLoading = useSelector(selectIsStatisticsLoading);
  const initial = user?.name?.trim()?.[0]?.toUpperCase() || <UserIcon />;

  const [recentWords, setRecentWords] = useState(null);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  useEffect(() => {
    // uses its own local state on purpose, so it does not touch the
    // shared words list state that the Dictionary page owns
    instance
      .get('/words/own', { params: { page: 1, limit: 5 } })
      .then(({ data }) => setRecentWords(data.results ?? []))
      .catch(() => setRecentWords([]));
  }, []);

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

      <div className={styles.wordsCard}>
        <div className={styles.wordsHeader}>
          <h2 className={styles.wordsTitle}>Your words</h2>
          <Link to="/dictionary" className={styles.wordsLink}>
            All words
            <ArrowRightIcon />
          </Link>
        </div>

        {recentWords === null && <p className={styles.wordsHint}>Loading…</p>}

        {recentWords?.length === 0 && (
          <p className={styles.wordsHint}>
            No words in your dictionary yet. <Link to="/dictionary">Add your first one</Link>.
          </p>
        )}

        {recentWords?.map((word) => (
          <div className={styles.wordRow} key={word._id}>
            <div className={styles.wordText}>
              <span className={styles.wordEn}>{word.en}</span>
              <span className={styles.wordUa}>{word.ua}</span>
            </div>
            <ProgressBar value={word.progress ?? 0} max={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
