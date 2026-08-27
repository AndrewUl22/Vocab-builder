import styles from './ProgressBar.module.css';

// variant circle is the small ring used in WordsTable rows.
// variant bar is the wide linear bar used on the Training page.
const ProgressBar = ({ value = 0, max = 100, label, variant = 'circle' }) => {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  if (variant === 'bar') {
    return (
      <div className={styles.wrapper}>
        <div
          className={styles.track}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div className={styles.fill} style={{ width: `${percent}%` }} />
        </div>
        {label && <span className={styles.label}>{label}</span>}
      </div>
    );
  }

  return (
    <div className={styles.circleWrapper}>
      <span className={styles.percentText}>{percent}%</span>
      <span
        className={styles.ring}
        style={{ '--percent': `${percent}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
};

export default ProgressBar;
