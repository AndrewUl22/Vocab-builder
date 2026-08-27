import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import Statistics from '../Statistics/Statistics';
import { PlusIcon, ArrowRightIcon } from '../icons/MenuIcons';
import styles from './Dashboard.module.css';

// Used on both Dictionary and Recommend pages. Add word button only
// makes sense on Dictionary, so it only shows up when onAddWord is passed.
const Dashboard = ({ onAddWord }) => {
  return (
    <section className={styles.dashboard}>
      <Filters />

      <div className={styles.actions}>
        <Statistics />

        <div className={styles.buttons}>
          {onAddWord && (
            <button type="button" className={styles.addWordBtn} onClick={onAddWord}>
              Add word
              <PlusIcon />
            </button>
          )}
          <Link to="/training" className={styles.trainLink}>
            Train oneself
            <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
