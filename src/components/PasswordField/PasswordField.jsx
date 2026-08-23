import { forwardRef, useState } from 'react';
import { EyeIcon, EyeOffIcon } from '../icons/EyeIcons';
import styles from '../FormField/FormField.module.css';
import ownStyles from './PasswordField.module.css';

const PasswordField = forwardRef(({ label = 'Password', error, ...rest }, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.field} ${ownStyles.field} ${error ? styles.fieldError : ''}`}>
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          placeholder={label}
          className={styles.input}
          aria-invalid={!!error}
          {...rest}
        />
        <button
          type="button"
          className={ownStyles.toggle}
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});

PasswordField.displayName = 'PasswordField';

export default PasswordField;
