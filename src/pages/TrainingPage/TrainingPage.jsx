import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchTasks, submitAnswers } from '../../redux/words/operations';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import TrainingRoom from '../../components/TrainingRoom/TrainingRoom';
import WellDoneModal from '../../components/WellDoneModal/WellDoneModal';
import Button from '../../components/Button/Button';
import styles from './TrainingPage.module.css';

const buildAnswer = (task, value) => ({
  _id: task._id,
  ua: task.ua,
  task: task.task,
  [task.task]: value,
});

const TrainingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks())
      .unwrap()
      .then((data) => setTasks(data.words ?? []))
      .catch((message) => {
        toast.error(message || 'Failed to load training tasks.');
        setTasks([]);
      });
  }, [dispatch]);

  const goToDictionaryWithAddWord = () => {
    navigate('/dictionary', { state: { openAddWord: true } });
  };

  const handleNext = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      setAnswers((prev) => [...prev, buildAnswer(tasks[currentIndex], trimmed)]);
    }
    setInputValue('');
    setCurrentIndex((index) => index + 1);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    const finalAnswers = trimmed
      ? [...answers, buildAnswer(tasks[currentIndex], trimmed)]
      : answers;

    setIsSaving(true);
    const result = await dispatch(submitAnswers(finalAnswers));
    setIsSaving(false);

    if (submitAnswers.rejected.match(result)) {
      toast.error(result.payload || 'Your progress was not saved. Please try again.');
      navigate('/dictionary');
      return;
    }

    setResults(result.payload);
  };

  if (tasks === null) {
    return <p className={styles.loading}>Loading…</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className={styles.empty}>
        <p>You do not have any words to train yet.</p>
        <Link to="/dictionary" onClick={goToDictionaryWithAddWord} className={styles.addWordLink}>
          Add word
        </Link>
      </div>
    );
  }

  const currentTask = tasks[currentIndex];
  const isLastTask = currentIndex === tasks.length - 1;

  return (
    <div className={styles.page}>
      <ProgressBar
        variant="bar"
        value={answers.length}
        max={tasks.length}
        label={`${answers.length}/${tasks.length}`}
      />

      <form className={styles.form} onSubmit={handleSave}>
        <TrainingRoom task={currentTask} value={inputValue} onChange={setInputValue} />

        <div className={styles.actions}>
          {!isLastTask && (
            <Button type="button" fullWidth={false} variant="outline" onClick={handleNext}>
              Next
            </Button>
          )}
          <Button type="submit" fullWidth={false} isLoading={isSaving}>
            Save
          </Button>
        </div>
      </form>

      {results && <WellDoneModal results={results} onClose={() => navigate('/dictionary')} />}
    </div>
  );
};

export default TrainingPage;
