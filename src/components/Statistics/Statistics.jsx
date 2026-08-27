import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/words/operations';
import { selectStatistics, selectIsStatisticsLoading } from '../../redux/words/slice';
import styles from './Statistics.module.css';

const Statistics = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const isLoading = useSelector(selectIsStatisticsLoading);

  useEffect(() => {
    dispatch(fetchStatistics());
  }, [dispatch]);

  // api only returns totalCount, no separate learned count
  const totalCount = statistics?.totalCount ?? '—';

  return (
    <p className={styles.stats} aria-busy={isLoading}>
      <span className={styles.label}>To study:</span>
      <span className={styles.value}>{isLoading ? '…' : totalCount}</span>
    </p>
  );
};

export default Statistics;
