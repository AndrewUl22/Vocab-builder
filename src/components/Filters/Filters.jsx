import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../redux/categories/slice';
import { selectFilters, setKeyword, setCategory, setIsIrregular } from '../../redux/words/slice';
import { useDebouncedEffect } from '../../hooks/useDebouncedEffect';
import { SearchIcon } from '../icons/MenuIcons';
import styles from './Filters.module.css';

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const filters = useSelector(selectFilters);

  const [searchInput, setSearchInput] = useState(filters.keyword);

  useDebouncedEffect(searchInput, (value) => {
    const trimmed = value.trim();
    if (trimmed !== filters.keyword) dispatch(setKeyword(trimmed));
  }, 300);

  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
  };

  const handleIrregularChange = (isIrregular) => {
    dispatch(setIsIrregular(isIrregular));
  };

  return (
    <div className={styles.filters}>
      <label className={styles.searchField}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Find the word"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </label>

      <div className={styles.categoryGroup}>
        <select
          className={styles.select}
          value={filters.category}
          onChange={handleCategoryChange}
          aria-label="Category"
        >
          <option value="">Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {filters.category === 'verb' && (
          <div className={styles.radioGroup} role="radiogroup" aria-label="Verb type">
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="isIrregular"
                checked={filters.isIrregular === false}
                onChange={() => handleIrregularChange(false)}
              />
              Regular
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                name="isIrregular"
                checked={filters.isIrregular === true}
                onChange={() => handleIrregularChange(true)}
              />
              Irregular
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filters;
