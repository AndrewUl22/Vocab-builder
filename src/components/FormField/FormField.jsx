import { forwardRef } from 'react';
import styles from './FormField.module.css';

const FormField = forwardRef(({ label, error, type = 'text', ...rest }, ref) => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.field} ${error ? styles.fieldError : ''}`}>
        <input
          ref={ref}
          type={type}
          placeholder={label}
          className={styles.input}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});

FormField.displayName = 'FormField';

export default FormField;
