import FormField from '../FormField/FormField';
import styles from './TrainingRoom.module.css';

const TrainingRoom = ({ task, value, onChange }) => {
  return (
    <div className={styles.room}>
      <div className={styles.inputSection}>
        <label className={styles.label} htmlFor="translation">
          Your translation
        </label>
        <FormField
          id="translation"
          label="Type the translation"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoFocus
        />
      </div>

      <div className={styles.wordSection}>
        <span className={styles.wordLabel}>Translate to {task.task === 'ua' ? 'Ukrainian' : 'English'}</span>
        <span className={styles.word}>{task.ua ?? task.en}</span>
      </div>
    </div>
  );
};

export default TrainingRoom;
