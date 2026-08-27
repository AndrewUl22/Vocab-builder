import ProgressBar from '../ProgressBar/ProgressBar';
import ActionsMenu from '../ActionsMenu/ActionsMenu';
import Button from '../Button/Button';
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
            <th>En</th>
            <th>Ua</th>
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
                  <Button
                    type="button"
                    fullWidth={false}
                    variant="outline"
                    onClick={() => onAddToDictionary(word.id)}
                  >
                    Add to dictionary
                  </Button>
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
