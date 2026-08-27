import { Link } from 'react-router-dom';
import Filters from '../Filters/Filters';
import Statistics from '../Statistics/Statistics';
import Button from '../Button/Button';
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
            <Button type="button" fullWidth={false} onClick={onAddWord}>
              Add word
            </Button>
          )}
          <Link to="/training" className={styles.trainLink}>
            Train oneself
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
