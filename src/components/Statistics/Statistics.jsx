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

  // Confirmed against the live Swagger docs: GET /words/statistics returns
  // only { totalCount }.
  const totalCount = statistics?.totalCount ?? '—';

  return (
    <dl className={styles.stats} aria-busy={isLoading}>
      <div className={styles.item}>
        <dt className={styles.label}>Words to learn</dt>
        <dd className={styles.value}>{isLoading ? '…' : totalCount}</dd>
      </div>
    </dl>
  );
};

export default Statistics;
