import styles from './ProgressBar.module.css';

// value and max control the fill percent. label is optional text next to the bar.
const ProgressBar = ({ value = 0, max = 100, label }) => {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

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
};

export default ProgressBar;
