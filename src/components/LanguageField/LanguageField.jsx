import { forwardRef } from 'react';
import { UkFlagIcon, UaFlagIcon } from '../icons/FlagIcons';
import styles from './LanguageField.module.css';

const FLAGS = { en: UkFlagIcon, ua: UaFlagIcon };

const LanguageField = forwardRef(({ lang, placeholder, error, ...rest }, ref) => {
  const Flag = FLAGS[lang];

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.field} ${error ? styles.fieldError : ''}`}>
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={styles.input}
          aria-invalid={!!error}
          {...rest}
        />
        {Flag && <Flag className={styles.flag} />}
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
});

LanguageField.displayName = 'LanguageField';

export default LanguageField;
