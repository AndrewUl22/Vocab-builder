import { ArrowRightIcon } from '../icons/MenuIcons';
import { UkFlagIcon, UaFlagIcon } from '../icons/FlagIcons';
import styles from './TrainingRoom.module.css';

const FLAGS = { en: UkFlagIcon, ua: UaFlagIcon };

const TrainingRoom = ({ task, value, onChange, onNext, showNext }) => {
  const givenLang = task.ua !== undefined ? 'ua' : 'en';
  const givenWord = task[givenLang];
  const targetLang = task.task === 'ua' ? 'ua' : 'en';
  const TargetFlag = FLAGS[targetLang];
  const GivenFlag = FLAGS[givenLang];

  return (
    <div className={styles.room}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <span className={styles.panelLabel}>Enter the translation</span>
          <TargetFlag />
        </div>
        <input
          type="text"
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoFocus
        />
        {showNext && (
          <button type="button" className={styles.nextLink} onClick={onNext}>
            Next
            <ArrowRightIcon />
          </button>
        )}
      </div>

      <div className={`${styles.panel} ${styles.panelRight}`}>
        <div className={styles.panelHeader}>
          <span />
          <GivenFlag />
        </div>
        <span className={styles.word}>{givenWord}</span>
      </div>
    </div>
  );
};

export default TrainingRoom;
