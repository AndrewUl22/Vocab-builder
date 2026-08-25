import { useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard';
import styles from './DictionaryPage.module.css';

const DictionaryPage = () => {
  const [isAddWordOpen, setIsAddWordOpen] = useState(false);

  return (
    <div className={styles.page}>
      <Dashboard onAddWord={() => setIsAddWordOpen(true)} />

      {/* TODO next stage: WordsTable + WordsPagination, AddWordModal/EditWordModal */}
      {isAddWordOpen && (
        <div className={styles.placeholder}>
          AddWordModal — TODO next stage
          <button type="button" onClick={() => setIsAddWordOpen(false)}>
            Close
          </button>
        </div>
      )}
      <div className={styles.placeholder}>WordsTable + WordsPagination — TODO next stage</div>
    </div>
  );
};

export default DictionaryPage;
