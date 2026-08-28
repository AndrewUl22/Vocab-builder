import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchTasks, submitAnswers } from '../../redux/words/operations';
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
        <p className={styles.emptyTitle}>You don't have a single word to learn right now.</p>
        <p className={styles.emptyText}>
          Please create or add a word to start the workout. We want to improve your
          vocabulary and develop your knowledge, so please share the words you are
          interested in adding to your study.
        </p>
        <div className={styles.emptyActions}>
          <Button type="button" fullWidth={false} onClick={goToDictionaryWithAddWord}>
            Add word
          </Button>
          <Button type="button" fullWidth={false} variant="outline" onClick={() => navigate('/dictionary')}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  const currentTask = tasks[currentIndex];
  const isLastTask = currentIndex === tasks.length - 1;
  const remaining = tasks.length - currentIndex;

  return (
    <div className={styles.page}>
      <span className={styles.counter}>{remaining}</span>

      <form className={styles.form} onSubmit={handleSave}>
        <TrainingRoom
          task={currentTask}
          value={inputValue}
          onChange={setInputValue}
          onNext={handleNext}
          showNext={!isLastTask}
        />

        <div className={styles.actions}>
          <Button type="submit" fullWidth={false} isLoading={isSaving}>
            Save
          </Button>
          <Button type="button" fullWidth={false} variant="outline" onClick={() => navigate('/dictionary')}>
            Cancel
          </Button>
        </div>
      </form>

      {results && <WellDoneModal results={results} onClose={() => navigate('/dictionary')} />}
    </div>
  );
};

export default TrainingPage;
