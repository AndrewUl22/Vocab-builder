import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './WellDoneModal.module.css';

const wordLabel = (item) => item.en ?? item.ua;

const WellDoneModal = ({ results, onClose }) => {
  const correct = results.filter((item) => item.isDone);
  const mistakes = results.filter((item) => !item.isDone);

  return (
    <Modal title="Well done" onClose={onClose}>
      <div className={styles.columns}>
        <div className={styles.column}>
          <span className={styles.columnTitle}>Correct answers:</span>
          <ul className={styles.list}>
            {correct.map((item) => (
              <li key={item._id}>{wordLabel(item)}</li>
            ))}
          </ul>
        </div>
        <div className={styles.column}>
          <span className={styles.columnTitle}>Mistakes:</span>
          <ul className={styles.list}>
            {mistakes.map((item) => (
              <li key={item._id}>{wordLabel(item)}</li>
            ))}
          </ul>
        </div>
      </div>

      <Button type="button" onClick={onClose}>
        Continue
      </Button>
    </Modal>
  );
};

export default WellDoneModal;
