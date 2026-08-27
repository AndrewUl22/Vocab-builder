import ProgressBar from '../ProgressBar/ProgressBar';
import ActionsMenu from '../ActionsMenu/ActionsMenu';
import { ArrowRightIcon } from '../icons/MenuIcons';
import { UkFlagIcon, UaFlagIcon } from '../icons/FlagIcons';
import styles from './WordsTable.module.css';

// Used on both Dictionary page (mode dictionary, shows Edit/Delete) and
// Recommend page (mode recommend, shows an Add to dictionary button instead).
const WordsTable = ({ words, mode = 'dictionary', onEdit, onDelete, onAddToDictionary }) => {
  if (!words.length) {
    return <p className={styles.empty}>No words yet.</p>;
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <span className={styles.headerLabel}>
                Word <UkFlagIcon />
              </span>
            </th>
            <th>
              <span className={styles.headerLabel}>
                Translation <UaFlagIcon />
              </span>
            </th>
            <th>Category</th>
            <th>Progress</th>
            <th aria-label="Actions" />
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td>{word.en}</td>
              <td>{word.ua}</td>
              <td className={styles.category}>{word.category}</td>
              <td>
                <ProgressBar value={word.progress ?? 0} max={100} />
              </td>
              <td className={styles.actionsCell}>
                {mode === 'dictionary' ? (
                  <ActionsMenu onEdit={() => onEdit(word)} onDelete={() => onDelete(word.id)} />
                ) : (
                  <button
                    type="button"
                    className={styles.addToDictionaryBtn}
                    onClick={() => onAddToDictionary(word.id)}
                  >
                    Add to dictionary
                    <ArrowRightIcon />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WordsTable;
