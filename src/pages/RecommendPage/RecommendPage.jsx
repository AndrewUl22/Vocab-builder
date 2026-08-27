import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Dashboard from '../../components/Dashboard/Dashboard';
import WordsTable from '../../components/WordsTable/WordsTable';
import WordsPagination from '../../components/WordsPagination/WordsPagination';
import { fetchRecommendedWords, addToDictionary } from '../../redux/words/operations';
import {
  selectFilters,
  selectRecommendedPage,
  selectRecommendedWords,
  selectRecommendedTotalPages,
  selectIsRecommendedLoading,
  setRecommendedPage,
} from '../../redux/words/slice';
import styles from '../DictionaryPage/DictionaryPage.module.css';

const RecommendPage = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const page = useSelector(selectRecommendedPage);
  const words = useSelector(selectRecommendedWords);
  const totalPages = useSelector(selectRecommendedTotalPages);
  const isLoading = useSelector(selectIsRecommendedLoading);

  useEffect(() => {
    dispatch(fetchRecommendedWords({ ...filters, page }));
  }, [dispatch, filters, page]);

  const handleAddToDictionary = async (wordId) => {
    const result = await dispatch(addToDictionary(wordId));
    if (addToDictionary.rejected.match(result)) {
      toast.error(result.payload || 'Failed to add word. Please try again.');
    }
  };

  return (
    <div className={styles.page}>
      {/* no add word button on this page, on purpose */}
      <Dashboard />

      {isLoading ? (
        <p className={styles.loading}>Loading…</p>
      ) : (
        <>
          <WordsTable words={words} mode="recommend" onAddToDictionary={handleAddToDictionary} />
          <WordsPagination
            page={page}
            totalPages={totalPages}
            onPageChange={(nextPage) => dispatch(setRecommendedPage(nextPage))}
          />
        </>
      )}
    </div>
  );
};

export default RecommendPage;
