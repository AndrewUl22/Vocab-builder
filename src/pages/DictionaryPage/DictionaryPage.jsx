import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Dashboard from '../../components/Dashboard/Dashboard';
import WordsTable from '../../components/WordsTable/WordsTable';
import WordsPagination from '../../components/WordsPagination/WordsPagination';
import AddWordModal from '../../components/AddWordModal/AddWordModal';
import EditWordModal from '../../components/EditWordModal/EditWordModal';
import { fetchWords, deleteWord } from '../../redux/words/operations';
import {
  selectFilters,
  selectPage,
  selectWords,
  selectTotalPages,
  selectIsWordsLoading,
  setPage,
} from '../../redux/words/slice';
import styles from './DictionaryPage.module.css';

const DictionaryPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const filters = useSelector(selectFilters);
  const page = useSelector(selectPage);
  const words = useSelector(selectWords);
  const totalPages = useSelector(selectTotalPages);
  const isLoading = useSelector(selectIsWordsLoading);

  const [isAddWordOpen, setIsAddWordOpen] = useState(false);
  const [editingWord, setEditingWord] = useState(null);

  useEffect(() => {
    dispatch(fetchWords({ ...filters, page }));
  }, [dispatch, filters, page]);

  useEffect(() => {
    if (location.state?.openAddWord) {
      setIsAddWordOpen(true);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location, navigate]);

  const handleDelete = async (wordId) => {
    const result = await dispatch(deleteWord(wordId));
    if (deleteWord.rejected.match(result)) {
      toast.error(result.payload || 'Failed to delete word. Please try again.');
    }
  };

  return (
    <div className={styles.page}>
      <Dashboard onAddWord={() => setIsAddWordOpen(true)} />

      {isLoading ? (
        <p className={styles.loading}>Loading…</p>
      ) : (
        <>
          <WordsTable
            words={words}
            mode="dictionary"
            onEdit={setEditingWord}
            onDelete={handleDelete}
          />
          <WordsPagination
            page={page}
            totalPages={totalPages}
            onPageChange={(nextPage) => dispatch(setPage(nextPage))}
          />
        </>
      )}

      {isAddWordOpen && <AddWordModal onClose={() => setIsAddWordOpen(false)} />}
      {editingWord && (
        <EditWordModal word={editingWord} onClose={() => setEditingWord(null)} />
      )}
    </div>
  );
};

export default DictionaryPage;
