import Dashboard from '../../components/Dashboard/Dashboard';
import styles from '../DictionaryPage/DictionaryPage.module.css';

const RecommendPage = () => {
  return (
    <div className={styles.page}>
      {/* No AddWordBtn on Recommend page — onAddWord intentionally omitted */}
      <Dashboard />

      {/* TODO next stage: WordsTable (with "Add to dictionary" instead of ActionsBtn) + WordsPagination */}
      <div className={styles.placeholder}>WordsTable + WordsPagination — TODO next stage</div>
    </div>
  );
};

export default RecommendPage;
