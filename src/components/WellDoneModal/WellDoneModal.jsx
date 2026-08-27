import Modal from '../Modal/Modal';
import Button from '../Button/Button';
import styles from './WellDoneModal.module.css';

const WellDoneModal = ({ results, onClose }) => {
  const total = results.length;
  const correct = results.filter((item) => item.isDone).length;

  return (
    <Modal title="Well done!" onClose={onClose}>
      <p className={styles.summary}>
        You got <span className={styles.score}>{correct}</span> out of {total} right.
      </p>
      <Button type="button" onClick={onClose}>
        Continue
      </Button>
    </Modal>
  );
};

export default WellDoneModal;
