import styles from './WordsPagination.module.css';

const WordsPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className={styles.pagination} aria-label="Words pagination">
      <button
        type="button"
        className={styles.navBtn}
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        Prev
      </button>

      <ul className={styles.list}>
        {pages.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              type="button"
              className={`${styles.pageBtn} ${pageNumber === page ? styles.active : ''}`}
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.navBtn}
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
      >
        Next
      </button>
    </nav>
  );
};

export default WordsPagination;
